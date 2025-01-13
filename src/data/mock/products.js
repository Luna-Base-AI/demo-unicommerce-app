export const FEATURED_PRODUCTS = [
    {
        id: '1',
        name: 'MacBook Pro M2',
        price: 1299,
        studentPrice: 1199,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef',
            'https://images.unsplash.com/photo-1537498425277-c283d32ef9db'
        ],
        category: 'Laptops',
        brand: 'Apple',
        modelNumber: 'MNEQ3LL/A',
        description: 'The new MacBook Pro M2 delivers groundbreaking performance and amazing battery life. With the blazing-fast M2 chip — the first Apple silicon designed for pros — you get exceptional performance and amazing battery life. The 14-inch Liquid Retina XDR display is the best ever in a laptop, and it features a 1080p camera, advanced connectivity, and the magic of macOS.',
        specs: {
            processor: 'Apple M2 Pro',
            ram: '16GB Unified Memory',
            storage: '512GB SSD',
            display: '14-inch Liquid Retina XDR',
            resolution: '3024 x 1964',
            camera: '1080p FaceTime HD',
            battery: 'Up to 18 hours',
            ports: 'Thunderbolt 4, HDMI, SDXC',
            weight: '3.5 lbs (1.6 kg)',
            dimensions: '12.31 x 8.71 x 0.61 inches'
        },
        inStock: true,
        quantity: 15,
        estimatedDelivery: '2-3 business days',
        location: {
            warehouse: 'Central Distribution Center',
            address: '123 Tech Way, Silicon Valley, CA',
            availability: ['In-store pickup', 'Home delivery']
        },
        warranty: {
            duration: '1 Year Limited Warranty',
            provider: 'Apple Inc.',
            terms: [
                'Hardware defects coverage',
                '90 days of technical support',
                'Software support',
                'Access to Apple repair services',
                'International warranty coverage'
            ],
            claimProcess: [
                'Contact Apple Support',
                'Get your product diagnosed',
                'Schedule a repair or replacement',
                'Track your repair status'
            ]
        },
        reviews: [
            {
                id: '1',
                userName: 'John D.',
                rating: 5,
                date: '2024-01-15',
                text: 'Amazing performance and battery life! The M2 chip is a game-changer for my development work.',
                verifiedPurchase: true,
                helpfulCount: 45
            },
            {
                id: '2',
                userName: 'Sarah M.',
                rating: 4,
                date: '2024-01-10',
                text: 'Great laptop but a bit pricey. The display is absolutely stunning though!',
                verifiedPurchase: true,
                helpfulCount: 32
            },
            {
                id: '3',
                userName: 'Mike R.',
                rating: 5,
                date: '2024-01-05',
                text: 'Perfect for university work. The student discount made it more affordable.',
                verifiedPurchase: true,
                helpfulCount: 28
            }
        ],
        rating: {
            average: 4.7,
            total: 1250,
            distribution: {
                5: 850,
                4: 275,
                3: 75,
                2: 35,
                1: 15
            }
        },
        relatedProducts: [
            {
                id: '2',
                name: 'MacBook Air M2',
                price: 1099,
                studentPrice: 999,
                image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
                category: 'Laptops',
                brand: 'Apple'
            },
            {
                id: '3',
                name: 'MacBook Pro 16"',
                price: 1499,
                studentPrice: 1399,
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef',
                category: 'Laptops',
                brand: 'Apple'
            },
            {
                id: '4',
                name: 'Dell XPS 13',
                price: 1199,
                studentPrice: 1099,
                image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
                category: 'Laptops',
                brand: 'Dell'
            }
        ],
        additionalInfo: {
            manualUrl: 'https://support.apple.com/manuals/macbook-pro-m2',
            faq: [
                {
                    question: 'Is this compatible with Windows software?',
                    answer: 'Yes, through Parallels or similar virtualization software.'
                },
                {
                    question: 'Does it come with Microsoft Office?',
                    answer: 'No, but you can purchase and install Microsoft Office separately.'
                }
            ],
            returnPolicy: '14-day return policy with full refund',
            bulkPurchase: {
                available: true,
                minimumQuantity: 5,
                discount: '5% additional discount'
            }
        }
    },
    {
        id: '2',
        name: 'iPhone 14 Pro',
        price: 999,
        studentPrice: 949,
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5',
        images: [
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
            'https://images.unsplash.com/photo-1605236453806-6ff36851218e'
        ],
        category: 'Smartphones',
        brand: 'Apple',
        modelNumber: 'MQ0G3LL/A',
        description: 'iPhone 14 Pro. Capture incredible detail with a 48MP Main camera. Experience iPhone in a whole new way with Dynamic Island and Always-On display. And get peace of mind with groundbreaking safety features.',
        specs: {
            screen: '6.1-inch Super Retina XDR',
            camera: '48MP Main | 12MP Ultra Wide',
            storage: '256GB',
            chip: 'A16 Bionic',
            battery: 'Up to 23 hours video playback',
            biometrics: 'Face ID',
            waterResistance: 'IP68',
            dimensions: '5.81 x 2.81 x 0.31 inches'
        },
        inStock: true,
        quantity: 8,
        estimatedDelivery: '1-2 business days',
        location: {
            warehouse: 'Main Retail Store',
            address: '456 Apple Ave, Cupertino, CA',
            availability: ['In-store pickup', 'Home delivery']
        },
        warranty: {
            duration: '1 Year Limited Warranty',
            provider: 'Apple Inc.',
            terms: [
                'Hardware defects coverage',
                'Technical support',
                'Software support',
                'AppleCare+ available'
            ],
            claimProcess: [
                'Visit Apple Store',
                'Contact Apple Support',
                'Mail-in repair service',
                'Express replacement'
            ]
        },
        reviews: [
            {
                id: '1',
                userName: 'Emily K.',
                rating: 5,
                date: '2024-01-20',
                text: 'The camera system is incredible! Dynamic Island is a game-changer.',
                verifiedPurchase: true,
                helpfulCount: 56
            },
            {
                id: '2',
                userName: 'David L.',
                rating: 4,
                date: '2024-01-18',
                text: 'Great phone but battery life could be better.',
                verifiedPurchase: true,
                helpfulCount: 34
            }
        ],
        rating: {
            average: 4.8,
            total: 2345,
            distribution: {
                5: 1800,
                4: 400,
                3: 100,
                2: 30,
                1: 15
            }
        },
        relatedProducts: [
            {
                id: '5',
                name: 'iPhone 14',
                price: 799,
                studentPrice: 749,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
                category: 'Smartphones',
                brand: 'Apple'
            },
            {
                id: '6',
                name: 'iPhone 14 Pro Max',
                price: 1099,
                studentPrice: 1049,
                image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
                category: 'Smartphones',
                brand: 'Apple'
            }
        ]
    }
];

export const PRODUCT_CATEGORIES = [
    'Laptops',
    'Smartphones',
    'Tablets',
    'Accessories',
    'Audio',
    'Monitors',
    'Storage',
    'Gaming'
];

export const BRANDS = [
    'Apple',
    'Dell',
    'Samsung',
    'HP',
    'Lenovo',
    'ASUS',
    'Acer',
    'Microsoft'
];

export const SORT_OPTIONS = [
    { id: 'popularity', label: 'Most Popular' },
    { id: 'priceLowToHigh', label: 'Price: Low to High' },
    { id: 'priceHighToLow', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'rating', label: 'Customer Rating' },
    { id: 'discount', label: 'Biggest Discount' }
];

export const REVIEW_SORT_OPTIONS = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'helpful', label: 'Most Helpful' },
    { id: 'highRating', label: 'Highest Rating' },
    { id: 'lowRating', label: 'Lowest Rating' }
];