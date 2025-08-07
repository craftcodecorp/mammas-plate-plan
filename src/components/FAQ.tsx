import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-elements";
import { useLanguage } from "@/lib/use-language";

// Create FAQ items array dynamically using translation keys
const createFaqItems = (t: (key: string) => string) => [
  {
    question: t('faq.item1.question'),
    answer: t('faq.item1.answer')
  },
  {
    question: t('faq.item2.question'),
    answer: t('faq.item2.answer')
  },
  {
    question: t('faq.item3.question'),
    answer: t('faq.item3.answer')
  },
  {
    question: t('faq.item4.question'),
    answer: t('faq.item4.answer')
  },
  {
    question: t('faq.item5.question'),
    answer: t('faq.item5.answer')
  },
  {
    question: t('faq.item6.question'),
    answer: t('faq.item6.answer')
  },
  {
    question: t('faq.item7.question'),
    answer: t('faq.item7.answer')
  },
  {
    question: t('faq.item8.question'),
    answer: t('faq.item8.answer')
  }
];

const FAQ = () => {
  const { t } = useLanguage();
  
  // Generate FAQ items using the translation function
  const faqItems = createFaqItems(t);
  
  return (
    <section className="py-20 bg-muted/30" id="faq">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </FadeInUp>

        <StaggerContainer className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <StaggerItem key={index}>
                <AccordionItem value={`item-${index}`} className="border-b border-muted">
                  <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FAQ;
