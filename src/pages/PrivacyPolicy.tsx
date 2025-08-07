import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/layout/page-layout";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/use-language";

const PrivacyPolicy = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Base URL for canonical links
  const baseUrl = language === 'pt-BR' 
    ? 'https://cardapiofacil.online' 
    : 'https://cardapiofacil.online/en';
    
  // Generate canonical URL
  const canonical = `${baseUrl}${location.pathname}`;
  
  return (
    <PageLayout
      showBreadcrumbs={true}
      header={<Header />}
      seo={{
        title: "Política de Privacidade | Mamma's Plate Plan",
        description: "Política de privacidade do serviço Mamma's Plate Plan. Saiba como protegemos seus dados e informações pessoais.",
        canonical,
        openGraph: {
          title: "Política de Privacidade | Mamma's Plate Plan",
          description: "Política de privacidade do serviço Mamma's Plate Plan. Saiba como protegemos seus dados e informações pessoais.",
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Mamma's Plate Plan"
        },
        additionalMetaTags: [
          { name: 'keywords', content: 'política de privacidade, lgpd, proteção de dados, cardápio fácil, termos de uso' }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
              <p>
                O Cardápio Fácil está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nosso serviço de planejamento de refeições via WhatsApp.
              </p>
              <p className="mt-2">
                Ao utilizar nosso serviço, você concorda com a coleta e uso de informações de acordo com esta política. Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
              <p>
                Para fornecer e melhorar nosso serviço, coletamos diversos tipos de informações, incluindo:
              </p>
              
              <h3 className="text-xl font-medium mt-4 mb-2">2.1 Informações Pessoais</h3>
              <p>
                Quando você se registra e utiliza o Cardápio Fácil, podemos coletar as seguintes informações pessoais:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Nome completo</li>
                <li>Número de telefone</li>
                <li>Endereço de e-mail</li>
                <li>Informações de pagamento (processadas por provedores de pagamento terceirizados)</li>
                <li>Preferências alimentares e restrições dietéticas</li>
                <li>Composição familiar (número de pessoas, idades)</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4 mb-2">2.2 Dados de Uso</h3>
              <p>
                Também coletamos informações sobre como você acessa e usa nosso serviço, incluindo:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Interações com nosso serviço via WhatsApp</li>
                <li>Preferências de cardápio e avaliações de receitas</li>
                <li>Frequência de uso do serviço</li>
                <li>Padrões de uso e comportamento</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Como Usamos Suas Informações</h2>
              <p>
                Utilizamos as informações coletadas para os seguintes propósitos:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Fornecer e manter nosso serviço de planejamento de refeições</li>
                <li>Personalizar cardápios e receitas de acordo com suas preferências e necessidades</li>
                <li>Processar suas transações e gerenciar sua conta</li>
                <li>Enviar notificações relacionadas ao serviço via WhatsApp</li>
                <li>Melhorar nosso serviço com base no feedback e padrões de uso</li>
                <li>Fornecer suporte ao cliente</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Base Legal para Processamento</h2>
              <p>
                Processamos suas informações pessoais com base nas seguintes condições legais:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Execução de Contrato:</strong> O processamento é necessário para a execução do contrato de serviço que você aceitou ao se inscrever no Cardápio Fácil.</li>
                <li><strong>Consentimento:</strong> Você nos deu permissão específica para processar seus dados para finalidades específicas.</li>
                <li><strong>Interesses Legítimos:</strong> O processamento é necessário para nossos interesses legítimos, como melhorar nosso serviço e prevenir fraudes.</li>
                <li><strong>Obrigação Legal:</strong> O processamento é necessário para cumprir com nossas obrigações legais.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Informações</h2>
              <p>
                Não vendemos suas informações pessoais a terceiros. No entanto, podemos compartilhar suas informações nas seguintes circunstâncias:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Provedores de Serviço:</strong> Compartilhamos informações com provedores de serviços terceirizados que nos ajudam a operar nosso serviço, como processadores de pagamento e serviços de hospedagem.</li>
                <li><strong>Parceiros de Negócios:</strong> Podemos compartilhar informações limitadas com parceiros de negócios para oferecer promoções ou serviços complementares.</li>
                <li><strong>Requisitos Legais:</strong> Podemos divulgar suas informações se exigido por lei ou em resposta a solicitações legais válidas.</li>
                <li><strong>Proteção de Direitos:</strong> Podemos divulgar informações para proteger nossos direitos, propriedade ou segurança, bem como os de nossos usuários.</li>
              </ul>
              <p className="mt-2">
                Todos os terceiros com quem compartilhamos suas informações estão contratualmente obrigados a proteger seus dados e cumprir as leis de proteção de dados aplicáveis.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Estas medidas incluem:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento regular de segurança</li>
                <li>Treinamento de funcionários em práticas de segurança de dados</li>
              </ul>
              <p className="mt-2">
                No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança absoluta.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para os fins estabelecidos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
              <p className="mt-2">
                Quando você cancela sua conta, podemos reter certas informações por um período limitado para fins legais, de auditoria e prevenção de fraudes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Seus Direitos de Privacidade</h2>
              <p>
                De acordo com a LGPD e outras leis de proteção de dados aplicáveis, você tem os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Acesso:</strong> Direito de acessar suas informações pessoais que mantemos.</li>
                <li><strong>Correção:</strong> Direito de corrigir informações imprecisas ou incompletas.</li>
                <li><strong>Exclusão:</strong> Direito de solicitar a exclusão de suas informações pessoais.</li>
                <li><strong>Restrição:</strong> Direito de solicitar a restrição do processamento de suas informações.</li>
                <li><strong>Portabilidade:</strong> Direito de receber suas informações em um formato estruturado e transferível.</li>
                <li><strong>Objeção:</strong> Direito de se opor ao processamento de suas informações.</li>
                <li><strong>Retirada de Consentimento:</strong> Direito de retirar seu consentimento a qualquer momento.</li>
              </ul>
              <p className="mt-2">
                Para exercer qualquer um desses direitos, entre em contato conosco através dos canais indicados na seção "Contato" abaixo.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Transferências Internacionais de Dados</h2>
              <p>
                Suas informações podem ser transferidas e mantidas em computadores localizados fora de seu estado, província, país ou outra jurisdição governamental, onde as leis de proteção de dados podem ser diferentes.
              </p>
              <p className="mt-2">
                Quando transferimos seus dados para fora do Brasil, garantimos que medidas adequadas de proteção sejam implementadas, como cláusulas contratuais padrão ou certificações de proteção de dados reconhecidas.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Crianças</h2>
              <p>
                Nosso serviço não se destina a pessoas menores de 18 anos. Não coletamos intencionalmente informações pessoais de crianças. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas necessárias.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Alterações a Esta Política</h2>
              <p>
                Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e, se as alterações forem significativas, enviaremos uma notificação via WhatsApp ou e-mail.
              </p>
              <p className="mt-2">
                Recomendamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
              <p>
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas práticas de dados, entre em contato conosco:
              </p>
              <ul className="list-none mt-2">
                <li><strong>E-mail:</strong> privacidade@cardapiofacil.online</li>
                <li><strong>Endereço:</strong> Av. Paulista, 171, São Paulo - SP, 01310-100</li>
                <li><strong>Encarregado de Proteção de Dados (DPO):</strong> dpo@cardapiofacil.online</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
