import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../../services/api';
import { toast } from 'react-toastify';

const CertificationsManagement = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: '',
        credentialUrl: '',
        badge: '',
        grade: '',
        category: '',
        skills: '',
        duration: '',
        level: '',
        description: ''
    });

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await getCertifications();
            setCertifications(response.data);
        } catch (error) {
            toast.error('Failed to load certifications');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingCert) {
                await updateCertification(editingCert.id, formData);
                toast.success('Certification updated!');
            } else {
                await createCertification(formData);
                toast.success('Certification created!');
            }
            fetchCertifications();
            closeModal();
        } catch (error) {
            toast.error('Failed to save certification');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this certification?')) return;

        try {
            await deleteCertification(id);
            toast.success('Certification deleted');
            fetchCertifications();
        } catch (error) {
            toast.error('Failed to delete certification');
        }
    };

    const openModal = (cert = null) => {
        if (cert) {
            setEditingCert(cert);
            setFormData({
                title: cert.title,
                issuer: cert.issuer,
                date: cert.date,
                credentialUrl: cert.credentialUrl || '',
                badge: cert.badge || '',
                grade: cert.grade || '',
                category: cert.category || '',
                skills: cert.skills || '',
                duration: cert.duration || '',
                level: cert.level || '',
                description: cert.description || ''
            });
        } else {
            setEditingCert(null);
            setFormData({
                title: '',
                issuer: '',
                date: '',
                credentialUrl: '',
                badge: '',
                grade: '',
                category: '',
                skills: '',
                duration: '',
                level: '',
                description: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCert(null);
        setFormData({
            title: '',
            issuer: '',
            date: '',
            credentialUrl: '',
            badge: '',
            grade: '',
            category: '',
            skills: '',
            duration: '',
            level: '',
            description: ''
        });
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Certifications Management</h1>
                <button
                    onClick={() => openModal()}
                    className="glass px-6 py-2 rounded-lg text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/10 transition-all"
                >
                    ➕ Add New Certification
                </button>
            </div>

            <div className="glass p-6 rounded-xl border border-gray-700/50">
                {certifications.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No certifications yet. Add your first one!</p>
                ) : (
                    <div className="space-y-4">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="glass p-4 rounded-lg border border-gray-700/50 flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3">
                                        {cert.badge && (
                                            <div className="text-3xl">{cert.badge}</div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{cert.title}</h3>
                                            <p className="text-cyber-blue text-sm">{cert.issuer}</p>
                                            <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyber-green text-xs hover:underline mt-2 inline-block"
                                                >
                                                    View Credential →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => openModal(cert)}
                                        className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded hover:bg-cyber-blue/20 transition-colors text-sm"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert.id)}
                                        className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors text-sm"
                                    >
                                        ✕ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="glass max-w-lg w-full rounded-xl border border-gray-700/50 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-700/50">
                            <h2 className="text-2xl font-bold text-white">
                                {editingCert ? 'Edit Certification' : 'New Certification'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            <div className="overflow-y-auto p-6 space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="Google Cybersecurity Professional Certificate"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Issuer *</label>
                                    <input
                                        type="text"
                                        value={formData.issuer}
                                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                        required
                                        placeholder="Google / Coursera"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Date *</label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                        placeholder="December 2024"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Badge Emoji</label>
                                    <input
                                        type="text"
                                        value={formData.badge}
                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                        placeholder="🛡️ or 🎓"
                                        maxLength={2}
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Credential URL</label>
                                    <input
                                        type="url"
                                        value={formData.credentialUrl}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                        placeholder="https://coursera.org/verify/..."
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Grade (%)</label>
                                    <input
                                        type="text"
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        placeholder="97.62"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    >
                                        <option value="">Select category</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        placeholder="Encryption, Network Security, Risk Management"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="6 months"
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Level</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    >
                                        <option value="">Select level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Professional">Professional</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Comprehensive program covering cybersecurity fundamentals, risk management, and practical security tools..."
                                        rows={3}
                                        className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-blue focus:outline-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 glass px-6 py-2 rounded-lg text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/10 transition-all"
                                    >
                                        {editingCert ? 'Update' : 'Create'} Certification
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 glass px-6 py-2 rounded-lg text-gray-400 border border-gray-700/30 hover:bg-gray-800/50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificationsManagement;
