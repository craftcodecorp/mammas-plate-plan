import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-elements";

const faqItems = [
  {
    question: "Como funciona o Cardápio Fácil?",
    answer: "Após se cadastrar, você receberá semanalmente no seu WhatsApp um cardápio personalizado com base no perfil da sua família, incluindo lista de compras organizada e receitas detalhadas. Tudo isso sem precisar baixar aplicativos ou fazer login em plataformas complicadas."
  },
  {
    question: "Quanto custa o serviço?",
    answer: "Oferecemos um teste gratuito de 14 dias para que você experimente o serviço sem compromisso. Após esse período, o valor é de R$29,90 por mês, com possibilidade de cancelamento a qualquer momento."
  },
  {
    question: "Como são elaborados os cardápios?",
    answer: "Nossos cardápios são elaborados por nutricionistas especializados, considerando as necessidades nutricionais da sua família, preferências alimentares e eventuais restrições. Utilizamos ingredientes sazonais e de fácil acesso em supermercados."
  },
  {
    question: "Posso personalizar meu cardápio?",
    answer: "Sim! Durante o cadastro, você informa o perfil da sua família, incluindo número de pessoas, idades, preferências e restrições alimentares. Além disso, você pode solicitar ajustes a qualquer momento respondendo às mensagens no WhatsApp."
  },
  {
    question: "Como funciona para famílias com bebês?",
    answer: "Para famílias com bebês, incluímos orientações específicas para introdução alimentar, respeitando a idade da criança e as recomendações pediátricas atuais, com receitas adaptadas que toda a família pode consumir."
  },
  {
    question: "E se eu tiver restrições alimentares?",
    answer: "Nossos cardápios são totalmente adaptáveis para diversas restrições alimentares, como intolerância à lactose, glúten, vegetarianismo, veganismo e alergias específicas. Basta informar suas necessidades no cadastro."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. Basta enviar uma mensagem pelo WhatsApp solicitando o cancelamento."
  },
  {
    question: "Como é feito o pagamento?",
    answer: "O pagamento é feito mensalmente via PIX ou cartão de crédito. Você receberá as instruções de pagamento após o período de teste gratuito."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-muted/30" id="faq">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Cardápio Fácil e como podemos ajudar sua família
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
