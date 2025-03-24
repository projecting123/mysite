'use client';
import { Container, Flex, Heading, Text } from "@radix-ui/themes"
import { AnimatePresence, LayoutGroup, motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import React, { useEffect, useRef, useState } from "react";

interface Sections {
    title: string,
    name: SectionName,
    description: string
}

type SectionName = 'courses' | 'quizes' | 'notes';

const MotionText = motion.create(Text);
const MotionFlex = motion.create(Flex);
const MotionHeading = motion.create(Heading);
const sections: Sections[] = [
    {
        title: 'Courses',
        name: 'courses',
        description: 'Our courses is made for everyone with fun and enjoyable.'
    },

    {
        title: 'Daily Quizes',
        name: 'quizes',
        description: 'Test your knowledge with our daily quiz sessions.'
    },

    {
        title: 'PDF Notes',
        name: 'notes',
        description: 'Download notes for a specific course anytime and anywhere.'
    }
]

export function FeatureSection() {
    const [activeSection, setActiveSection] = useState<SectionName | undefined>();
    const target = useRef(null);
    const inViewTarget = useRef(null);
    const { scrollY } = useScroll({ target });
    const inView = useInView(inViewTarget, { once: true, amount: 'all' });
    const motionCourseProgress = useTransform(scrollY, [808, 1408], [0, 100]);
    const motionQuizProgress = useTransform(scrollY, [1408, 2008], [0, 100]);
    const motionNotesProgress = useTransform(scrollY, [2008, 2608], [0, 100]);

    const [progress, setProgress] = useState({ coursesProgress: 0, quizesProgress: 0, notesProgress: 0 });

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 808 && latest < 1408) setActiveSection('courses');
        else if (latest > 1408 && latest < 2008) setActiveSection('quizes');
        else if (latest > 2008 && latest < 2608) setActiveSection('notes');
    })

    useMotionValueEvent(motionCourseProgress, 'change', latest => setProgress({ ...progress, coursesProgress: latest }));
    useMotionValueEvent(motionQuizProgress, 'change', latest => setProgress({ ...progress, quizesProgress: latest }));
    useMotionValueEvent(motionNotesProgress, 'change', latest => setProgress({ ...progress, notesProgress: latest }));

    useEffect(() => {
        inView && setActiveSection('courses')
    }, []);

    return (
        <>
            <Flex wrap={'wrap'} gap={'8'} mt={'4'} ref={target} className="p-4 h-[90dvh]" style={{ position: 'sticky', top: 20 }} align={'start'}>
                <Flex direction={'column'}>
                    {
                        sections.map((section, index) => (
                            <Flex key={index} gap={'2'}>
                                {section.name == activeSection ?
                                    <motion.div id='progress-bar' layoutId="progress-bar" transition={{ duration: 0.2 }} className='rounded-md w-[5px] bg-sky-300 shrink-0'>
                                        <motion.div style={{ height: section.name == 'courses' ? `${progress.coursesProgress}%` : section.name == 'quizes' ? `${progress.quizesProgress}%` : `${progress.notesProgress}%` }} className='w-full bg-sky-700 rounded-md'></motion.div>
                                    </motion.div> : null
                                }
                                <MotionFlex direction={'column'} ref={inViewTarget}>
                                    <MotionHeading layout style={{ marginBlock: section.name == activeSection ? 0 : 4, transition: 'all 0.2s ease' }} className={`${section.name == activeSection ? 'text-primary' : 'text-gray-400'}`}>{section.title}</MotionHeading>
                                    {section.name == activeSection ?
                                        <MotionFlex
                                            gap={'2'}
                                            direction={'column'}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.1 }}>
                                            <MotionText style={{ lineHeight: 1.1 }}
                                            >
                                                {section.description}
                                            </MotionText>
                                            <MotionText>Examples: </MotionText>
                                        </MotionFlex> : null
                                    }
                                </MotionFlex>
                            </Flex>
                        ))
                    }
                </Flex>

                <Flex>
                    <AnimatePresence>
                        {
                            sections.map((section, index) => (
                                section.name == activeSection &&
                                <MotionFlex key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Heading>{section.title}</Heading>
                                </MotionFlex>
                            ))
                        }
                    </AnimatePresence>
                </Flex>
            </Flex>
        </>
    )
}