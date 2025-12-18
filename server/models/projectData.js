// Mock MongoDB data structure for projects
const projectData = [
    {
        _id: '1',
        title: 'Diabetic Retinopathy Detection',
        description: 'Medical image classification using CNN ResNet-50 and Transfer Learning.',
        fullDescription: 'A deep learning solution designed to detect diabetic retinopathy from retinal fundus images. Leveraging the power of ResNet-50 and Transfer Learning, this system achieves high accuracy in classifying different stages of the disease, aiding ophthalmologists in early diagnosis.',
        features: [
            'High-accuracy classification using ResNet-50',
            'Automated image preprocessing and augmentation',
            'Transfer learning for optimized performance on small datasets',
            'Heatmap visualization for interpretability (Grad-CAM)'
        ],
        github: 'https://github.com/hamzaBencheikh8',
        challenges: 'Overcoming the class imbalance in the dataset and ensuring the model generalized well to unseen images from different sources.',
        tags: ['Python', 'PyTorch', 'Image Processing'],
        category: 'AI/ML',
        year: 2024
    },
    {
        _id: '2',
        title: 'Visually Impaired Guidance App',
        description: 'Full stack web app for localization in Mecca. Accessible interfaces.',
        fullDescription: 'A specialized navigation application built for visually impaired pilgrims in Mecca. It uses geolocation and voice synthesis to provide real-time guidance, ensuring a safer and more independent pilgrimage experience.',
        features: [
            'Real-time voice-guided navigation',
            'High-contrast accessible UI designs',
            'Integration with mapping APIs for precise localization',
            'Emergency SOS feature for immediate assistance'
        ],
        github: 'https://github.com/hamzaBencheikh8',
        challenges: 'Designing a UI that is truly accessible for the visually impaired while maintaining accurate real-time location tracking in crowded areas.',
        tags: ['React.js', 'Node.js', 'MongoDB'],
        category: 'Web Development',
        year: 2024
    },
    {
        _id: '3',
        title: 'Traffic Sign Recognition System',
        description: 'Real-time system for autonomous vehicles using Computer Vision.',
        fullDescription: 'An efficient computer vision system capable of recognizing and classifying traffic signs in real-time. Designed for autonomous vehicle applications, it detects speed limits, warnings, and stops with low latency.',
        features: [
            'Real-time detection using OpenCV',
            'Robust classification with custom CNN architecture',
            'Works under varying lighting conditions',
            'Optimized for embedded systems'
        ],
        github: 'https://github.com/hamzaBencheikh8',
        challenges: 'Ensuring real-time performance on limited hardware and handling occluded or damaged traffic signs.',
        tags: ['Python', 'OpenCV', 'CNN'],
        category: 'Computer Vision',
        year: 2023
    },
    {
        _id: '4',
        title: 'Smart Farm IoT',
        description: 'Automatic plant disease detection and culture parameter analysis.',
        fullDescription: 'An IoT-based smart farming solution that monitors environmental parameters and detects plant diseases using image analysis. It provides farmers with actionable insights to improve crop yield and resource efficiency.',
        features: [
            'Real-time monitoring of soil moisture, temperature, and humidity',
            'Disease detection using camera modules and ML',
            'Mobile dashboard for remote monitoring',
            'Automated irrigation control system'
        ],
        github: 'https://github.com/hamzaBencheikh8',
        challenges: 'Integrating disparate hardware sensors with the software stack and ensuring reliable data transmission in a farm environment.',
        tags: ['IoT Sensors', 'Machine Learning', 'Python'],
        category: 'IoT',
        year: 2023
    }
];

export default projectData;
