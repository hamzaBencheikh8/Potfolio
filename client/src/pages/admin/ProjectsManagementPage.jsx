import React, { useState, useEffect } from 'react';
<parameter name="motion">
    import {getProjects, createProject, updateProject, deleteProject, uploadImage} from '../../services/api';
    import {toast} from 'react-toastify';

const ProjectsManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    image: ''
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
    setProjects(response.data);
        } catch (error) {
        toast.error('Failed to load projects');
        } finally {
        setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
            const response = await uploadImage(formData);
            setFormData(prev => ({...prev, image: response.data.imageUrl }));
    toast.success('Image uploaded!');
        } catch (error) {
        toast.error('Failed to upload image');
        } finally {
        setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
        };

    try {
            if (editingProject) {
        await updateProject(editingProject.id, projectData);
    toast.success('Project updated!');
            } else {
        await createProject(projectData);
    toast.success('Project created!');
            }
    fetchProjects();
    closeModal();
        } catch (error) {
        toast.error('Failed to save project');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return;

    try {
        await deleteProject(id);
    toast.success('Project deleted');
    fetchProjects();
        } catch (error) {
        toast.error('Failed to delete project');
        }
    };

    const openModal = (project = null) => {
        if (project) {
        setEditingProject(project);
    setFormData({
        title: project.title,
    description: project.description,
    technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
    liveUrl: project.liveUrl || '',
    githubUrl: project.githubUrl || '',
    image: project.image || ''
            });
        } else {
        setEditingProject(null);
    setFormData({
        title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    image: ''
            });
        }
    setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    setEditingProject(null);
    setFormData({
        title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    image: ''
        });
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Projects Management</h1>
            <button
                onClick={() => openModal()}
                className="glass px-6 py-2 rounded-lg text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/10 transition-all"
            >
                ➕ Add New Project
            </button>
        </div>

        <div className="glass p-6 rounded-xl border border-gray-700/50">
            {projects.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No projects yet. Add your first one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="glass p-4 rounded-lg border border-gray-700/50">
                            {project.image && (
                                <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                            )}
                            <h3 className="font-bold text-white text-lg mb-2">{project.title}</h3>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {project.technologies?.map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-cyber-green/10 text-cyber-green rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openModal(project)}
                                    className="flex-1 px-3 py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded hover:bg-cyber-blue/20 transition-colors text-sm"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="flex-1 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors text-sm"
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
                <div className="glass max-w-2xl w-full p-6 rounded-xl border border-gray-700/50 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {editingProject ? 'Edit Project' : 'New Project'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={3}
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Technologies (comma-separated) *</label>
                            <input
                                type="text"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                placeholder="React, Node.js, MongoDB"
                                required
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Live URL</label>
                            <input
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">GitHub URL</label>
                            <input
                                type="url"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Project Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="w-full px-4 py-2 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none"
                            />
                            {uploading && <p className="text-cyber-blue text-sm mt-1">Uploading...</p>}
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 glass px-6 py-2 rounded-lg text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/10 transition-all"
                            >
                                {editingProject ? 'Update' : 'Create'} Project
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

    export default ProjectsManagement;
