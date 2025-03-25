'use client';
import { Flex, Heading, Text } from "@radix-ui/themes"
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
    const target = useRef<HTMLDivElement>(null);
    const isInView = useInView(target, { amount: 'some' });
    const { scrollY } = useScroll({ target });
    const [targetInitialScroll, setTargetInitialScroll] = useState<number>(0);
    const motionCourseProgress = useTransform(scrollY, [targetInitialScroll, targetInitialScroll + 600], [0, 100]);
    const motionQuizProgress = useTransform(scrollY, [targetInitialScroll + 600, targetInitialScroll + 1200], [0, 100]);
    const motionNotesProgress = useTransform(scrollY, [targetInitialScroll + 1200, targetInitialScroll + 1800], [0, 100]);
    const [progress, setProgress] = useState({ coursesProgress: 0, quizesProgress: 0, notesProgress: 0 });

    useEffect(() => {
        const prevScrollY = window.scrollY;
        scroll({ top: 0 })
        const offsetTop = target.current?.offsetTop ?? 0;
        setTargetInitialScroll(offsetTop);

        if (prevScrollY > offsetTop && prevScrollY < offsetTop + 600) {
            scroll({ top: prevScrollY })
            setActiveSection('courses');
        }

        else if (prevScrollY > offsetTop + 600 && prevScrollY < offsetTop + 1200) {
            scroll({ top: prevScrollY })
            setActiveSection('quizes');
        }

        else if (prevScrollY > offsetTop + 1200 && prevScrollY < offsetTop + 1800) {
            scroll({ top: prevScrollY })
            setActiveSection('notes');
        }
    }, []);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > targetInitialScroll && latest < targetInitialScroll + 600) setActiveSection('courses');
        else if (latest > targetInitialScroll + 600 && latest < targetInitialScroll + 1200) setActiveSection('quizes');
        else if (latest > targetInitialScroll + 1200 && latest < targetInitialScroll + 1800) setActiveSection('notes');
        else setActiveSection('courses')
    })

    useMotionValueEvent(motionCourseProgress, 'change', latest => setProgress({ ...progress, coursesProgress: latest }));
    useMotionValueEvent(motionQuizProgress, 'change', latest => setProgress({ ...progress, quizesProgress: latest }));
    useMotionValueEvent(motionNotesProgress, 'change', latest => setProgress({ ...progress, notesProgress: latest }));


    return (
        <>
            <Flex wrap={'wrap'} gap={'8'} mt={'4'} ref={target} className="p-4 h-[90dvh]" style={{ position: 'sticky', top: 20 }} align={'start'}>
                <Flex direction={{ sm: 'column' }}>
                    {
                        sections.map((section, index) => (
                            <LayoutGroup key={index}>
                                <Flex gap={'2'}>
                                    {section.name == activeSection ?
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout transition={{ duration: 0.3 }} className='rounded-md w-[5px] bg-sky-300 shrink-0'>
                                            <motion.div style={{ height: section.name == 'courses' ? `${progress.coursesProgress}%` : section.name == 'quizes' ? `${progress.quizesProgress}%` : `${progress.notesProgress}%` }} className='w-full bg-sky-700 rounded-md'></motion.div>
                                        </motion.div> : null
                                    }
                                    <MotionFlex direction={'column'} className="my-1">
                                        <Flex display={{ initial: section.name == activeSection ? 'flex' : 'none', sm: 'flex' }}>
                                            <MotionHeading transition={{ duration: 0.15 }} layout className={`${section.name == activeSection ? 'text-primary' : 'text-gray-400'}`}>{section.title}</MotionHeading>
                                        </Flex>
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
                            </LayoutGroup>
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