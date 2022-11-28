import React, { FormEvent, ReactElement, useState } from 'react'
import { DynamicIcon } from '@shared/components'

type useMultiStepFormProps = {
    steps: ReactElement[]
    onSubmit: () => void
    formSteps: any[]
}

const useMultiStepForm = ({
    steps,
    onSubmit,
    formSteps
}: useMultiStepFormProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const prev = () => {
        if (currentIndex == 0) return
        setCurrentIndex(prev => prev - 1)
    }
    const next = (e: FormEvent) => {
        e.preventDefault()
        if (currentIndex < steps.length - 1)
            setCurrentIndex(prev => prev + 1)
        else
            onSubmit()
    }

    const isCurrentStep = (index: number) => index === currentIndex
    const isLastStep = () => currentIndex === steps.length - 1
    const isFirstStep = () => currentIndex === 0
    const isPendingStep = (index: number) => index > currentIndex
    const isPassedStep = (index: number) => index < currentIndex

    const Stepper = (
        <>
            {formSteps && formSteps.map(({ title, icon }: any, i: number) => (
                <React.Fragment key={title}>
                    <div className={`flex items-center relative  ${isCurrentStep(i) ? 'text-white' : isPendingStep(i) ? 'text-gray-500' : 'text-primary-600'}`}>
                        <div className={`rounded-full transition duration-500 ease-in-out h-10 w-10 py-2 border-2 border-primary-600 flex items-center justify-center ${isCurrentStep(i) ? 'bg-primary-600' : isPendingStep(i) ? 'border-gray-300' : ''}`}>
                            <DynamicIcon
                                className={`${isCurrentStep(i) ? 'text-white' : isPendingStep(i) ? 'text-gray-500' : 'text-primary-600'}`}
                                icon={isPassedStep(i) ? 'Ai/AiOutlineCheck' : icon}
                                size="20"
                                color="black"
                            />
                        </div>
                        <div className={`hidden sm:block absolute top-0 -ml-10 text-center mt-12 w-32 text-xs font-medium uppercase ${isPendingStep(i) ? 'text-gray-500' : 'text-primary-600'}`}>
                            {title}
                        </div>
                    </div>

                    {
                        i < formSteps.length - 1 && <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${isPendingStep(i + 1) ? 'border-gray-300' : 'border-primary-600'}`}></div>
                    }
                </React.Fragment>
            ))}
        </>
    )
    return {
        Stepper,
        currentIndex,
        steps,
        step: steps[currentIndex],
        prev,
        next,
        isCurrentStep,
        isLastStep,
        isFirstStep,
        isPendingStep,
        isPassedStep,
    }
}

export default useMultiStepForm