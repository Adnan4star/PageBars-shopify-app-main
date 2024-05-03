import React from 'react';
import {
    Card,
    InlineStack,
    Box,
    RadioButton,
    Text,
    BlockStack,
    SkeletonThumbnail,
    SkeletonDisplayText,
    SkeletonBodyText
} from '@shopify/polaris';

function ShowPages({ selectedValue, handleChange }) {
    const cardData = [
        {
            id: 'homee',
            label: 'Home',
            content: (
                <>
                    <Box padding={400} >
                        <BlockStack align='center' gap="200" >
                            <SkeletonDisplayText size="large" />
                            <SkeletonBodyText lines={5} />
                        </BlockStack>
                    </Box>
                </>
            ),
        },
        {
            id: 'products',
            label: 'Product',
            content: (
                <>
                    <Box padding={400} >
                        <div className='flex justify-between gap-2'>
                            <SkeletonThumbnail />
                            <div className='flex flex-col w-full gap-4'>
                                <SkeletonDisplayText size="large" />
                                <SkeletonBodyText lines={5} />
                            </div>
                        </div>
                    </Box>
                </>
            ),
        },
        {
            id: 'collections',
            label: 'Collections',
            content: (
                <>
                    <Box padding={400}  >
                        <BlockStack align='center' gap="200" >
                            <div className='flex gap-1 '>
                                {Array(4).fill(null).map((_, index) => (
                                    <SkeletonThumbnail size="medium" />
                                ))}
                            </div>
                            <div className='flex gap-1 '>
                                {Array(4).fill(null).map((_, index) => (
                                    <SkeletonThumbnail size="medium" />
                                ))}
                            </div>
                        </BlockStack>
                    </Box>
                </>

            ),
        },
        {
            id: 'blogs',
            label: 'Blog',
            content: (
                <>
                    <Box padding={400}  >
                        <BlockStack align='center' gap="400" >
                            <div className='min-w-full'>
                                <SkeletonDisplayText size="extraLarge" />
                            </div>
                            <div className='flex gap-1 '>
                                {Array(3).fill(null).map((_, index) => (
                                    <SkeletonThumbnail size="medium" />
                                ))}
                            </div>
                        </BlockStack>
                    </Box>
                </>
            ),
        },
        {
            id: 'pages',
            label: 'Pages',
            content: (
                <>
                    <Box padding={400} >
                        <BlockStack align='center' gap="200" >
                            <div className='flex gap-1 '>
                                {Array(4).fill(null).map((_, index) => (
                                    <SkeletonThumbnail size="medium" />
                                ))}
                            </div>
                            <SkeletonBodyText lines={3} />
                        </BlockStack>
                    </Box>
                </>
            ),
        },
    ];

    return (
        <Card sectioned title="Show on pages">
            <div className="flex flex-wrap justify-between">
                {cardData.map((card, index) => (
                    <CustomCard
                        key={index}
                        label={card.label}
                        id={card.id}
                        selectedValue={selectedValue}
                        handleChange={handleChange}
                    >
                        {card.content}
                    </CustomCard>
                ))}
            </div>
        </Card>
    );
}

function CustomCard({ label, id, selectedValue, handleChange, children }) {
    return (
        <div className="w-full sm:1/2 md:w-1/3 lg:w-1/5 p-2">
            <Card roundedAbove="sm" padding="0">
                <Box background="bg-surface-brand" padding="100" >
                    <RadioButton
                        label={label}
                        id={id}
                        name="accounts"
                        checked={selectedValue == id}
                        onChange={() => handleChange(id)}
                    />
                </Box>
                <BlockStack gap="2">
                    <Box minHeight="170px">
                        {children}
                    </Box>
                </BlockStack>
            </Card>
        </div>
    );
}


export default ShowPages;
