-- Migration: Insert initial project data
-- Run date: 2025-12-27
-- Description: Adds 4 core portfolio projects

-- Insert projects
INSERT INTO projects (
    title, 
    description, 
    technologies, 
    github_url, 
    key_features, 
    challenges,
    status,
    project_type,
    completion_date
) VALUES 
(
    'Diabetic Retinopathy Detection',
    'A deep learning solution designed to detect diabetic retinopathy from retinal fundus images. Leveraging the power of ResNet-50 and Transfer Learning, this system achieves high accuracy in classifying different stages of the disease, aiding ophthalmologists in early diagnosis.',
    ARRAY['Python', 'PyTorch', 'Image Processing'],
    'https://github.com/hamzaBencheikh8',
    ARRAY[
        'High-accuracy classification using ResNet-50',
        'Automated image preprocessing and augmentation',
        'Transfer learning for optimized performance on small datasets',
        'Heatmap visualization for interpretability (Grad-CAM)'
    ],
    'Overcoming the class imbalance in the dataset and ensuring the model generalized well to unseen images from different sources.',
    'Completed',
    'Personal',
    '2024-12-01'
),
(
    'Visually Impaired Guidance App',
    'A specialized navigation application built for visually impaired pilgrims in Mecca. It uses geolocation and voice synthesis to provide real-time guidance, ensuring a safer and more independent pilgrimage experience.',
    ARRAY['React.js', 'Node.js', 'MongoDB'],
    'https://github.com/hamzaBencheikh8',
    ARRAY[
        'Real-time voice-guided navigation',
        'High-contrast accessible UI designs',
        'Integration with mapping APIs for precise localization',
        'Emergency SOS feature for immediate assistance'
    ],
    'Designing a UI that is truly accessible for the visually impaired while maintaining accurate real-time location tracking in crowded areas.',
    'Completed',
    'Personal',
    '2024-11-01'
),
(
    'Traffic Sign Recognition System',
    'An efficient computer vision system capable of recognizing and classifying traffic signs in real-time. Designed for autonomous vehicle applications, it detects speed limits, warnings, and stops with low latency.',
    ARRAY['Python', 'OpenCV', 'CNN'],
    'https://github.com/hamzaBencheikh8',
    ARRAY[
        'Real-time detection using OpenCV',
        'Robust classification with custom CNN architecture',
        'Works under varying lighting conditions',
        'Optimized for embedded systems'
    ],
    'Ensuring real-time performance on limited hardware and handling occluded or damaged traffic signs.',
    'Completed',
    'Personal',
    '2023-08-01'
),
(
    'Smart Farm IoT',
    'An IoT-based smart farming solution that monitors environmental parameters and detects plant diseases using image analysis. It provides farmers with actionable insights to improve crop yield and resource efficiency.',
    ARRAY['IoT Sensors', 'Machine Learning', 'Python'],
    'https://github.com/hamzaBencheikh8',
    ARRAY[
        'Real-time monitoring of soil moisture, temperature, and humidity',
        'Disease detection using camera modules and ML',
        'Mobile dashboard for remote monitoring',
        'Automated irrigation control system'
    ],
    'Integrating disparate hardware sensors with the software stack and ensuring reliable data transmission in a farm environment.',
    'Completed',
    'Personal',
    '2023-06-01'
)
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT id, title, array_length(key_features, 1) as features_count, status
FROM projects
ORDER BY completion_date DESC;
