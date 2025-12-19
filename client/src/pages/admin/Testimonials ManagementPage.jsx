import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTestimonials, approveTestimonial, deleteTestimonial } from '../../services/api';
import { toast } from 'react-toastify';

const TestimonialsManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await getTestimonials();
            setTestimonials(response.data);
        } catch (error) {
            toast.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveTestimonial(id);
            toast.success('Testimonial approved!');
            fetchTestimonials();
        } catch (error) {
            toast.error('Failed to approve');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await deleteTestimonial(id);
            toast.success('Testimonial deleted');
            fetchTestimonials();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Testimonials Management</h1>

            <div className="glass p-6 rounded-xl border border-gray-700/50">
                <div className="space-y-4">
                    {testimonials.length === 0 ? (
                        <p className="text-gray-400">No testimonials yet.</p>
                    ) : (
                        testimonials.map((test) => (
                            <div key={test.id} className="glass p-4 rounded-lg border border-gray-700/50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-white">{test.name}</h3>
                                            {test.approved ? (
                                                <span className="text-xs px-2 py-1 bg-cyber-green/10 text-cyber-green rounded-full border border-cyber-green/30">Approved</span>
                                            ) : (
                                                <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/30">Pending</span>
                                            )}
                                        </div>
                                        {test.position && <p className="text-sm text-gray-400 mb-2">{test.position}</p>}
                                        <p className="text-gray-300 text-sm">"{test.message}"</p>
                                        <p className="text-xs text-gray-500 mt-2">{new Date(test.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {!test.approved && (
                                            <button
                                                onClick={() => handleApprove(test.id)}
                                                className="px-3 py-1 bg-cyber-green/10 text-cyber-green border border-cyber-green/30 rounded hover:bg-cyber-green/20 transition-colors text-sm"
                                            >
                                                ✓ Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(test.id)}
                                            className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors text-sm"
                                        >
                                            ✕ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsManagement;
