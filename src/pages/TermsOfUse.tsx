import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/layout/page-layout";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/use-language";

const TermsOfUse = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  
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
        title: t('seo.terms.title'),
        description: t('seo.terms.description'),
        canonical,
        openGraph: {
          title: t('seo.terms.title'),
          description: t('seo.terms.description'),
          type: 'website',
          url: canonical,
          image: `${baseUrl}/og-image.jpg`,
          siteName: "Mamma's Plate Plan"
        },
        additionalMetaTags: [
          { name: 'keywords', content: 'termos de uso, condições de serviço, contrato, cardápio fácil, termos legais' }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Uso</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o serviço Cardápio Fácil, você concorda em cumprir e estar vinculado aos seguintes termos e condições. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
              <p>
                O Cardápio Fácil é um serviço de planejamento de refeições personalizadas entregue via WhatsApp. Nosso serviço oferece cardápios semanais, receitas, listas de compras e dicas nutricionais adaptadas às necessidades e preferências de cada família.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Elegibilidade</h2>
              <p>
                Para utilizar o Cardápio Fácil, você deve ter pelo menos 18 anos de idade e possuir capacidade legal para celebrar contratos vinculativos. Ao utilizar nosso serviço, você declara e garante que atende a esses requisitos.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Cadastro e Conta</h2>
              <p>
                Para acessar determinados recursos do nosso serviço, você precisará criar uma conta. Você é responsável por manter a confidencialidade das informações da sua conta e por todas as atividades que ocorrerem nela. Você concorda em:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Fornecer informações precisas, atuais e completas durante o processo de registro;</li>
                <li>Manter e atualizar prontamente suas informações de registro;</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta ou qualquer outra violação de segurança.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Planos e Pagamentos</h2>
              <p>
                O Cardápio Fácil oferece diferentes planos de assinatura. Ao se inscrever em um plano pago, você concorda em pagar todas as taxas aplicáveis conforme especificado no momento da compra. Os pagamentos são processados por provedores de pagamento terceirizados e estão sujeitos aos termos e condições desses provedores.
              </p>
              <p className="mt-2">
                Você pode cancelar sua assinatura a qualquer momento, mas não haverá reembolsos para períodos parciais de serviço.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Uso do Serviço</h2>
              <p>
                Você concorda em usar o Cardápio Fácil apenas para fins legais e de acordo com estes Termos. Você não deve:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Usar o serviço de qualquer maneira que possa danificar, desabilitar ou sobrecarregar o serviço;</li>
                <li>Tentar acessar áreas do serviço às quais você não tem permissão;</li>
                <li>Usar o serviço para distribuir material publicitário ou promocional não solicitado;</li>
                <li>Reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do serviço sem autorização expressa por escrito.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Conteúdo e Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo disponibilizado através do Cardápio Fácil, incluindo textos, gráficos, logotipos, ícones, imagens, receitas, cardápios e software, é propriedade do Cardápio Fácil ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
              </p>
              <p className="mt-2">
                Você pode usar o conteúdo apenas para seu uso pessoal e não comercial. Qualquer outro uso, incluindo reprodução, modificação, distribuição, transmissão ou republicação, sem o consentimento prévio por escrito do Cardápio Fácil, é estritamente proibido.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Isenção de Responsabilidade</h2>
              <p>
                As informações nutricionais e receitas fornecidas pelo Cardápio Fácil são apenas para fins informativos e não substituem aconselhamento médico profissional, diagnóstico ou tratamento. Sempre consulte um profissional de saúde qualificado antes de fazer alterações significativas em sua dieta, especialmente se você tiver condições médicas preexistentes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitação de Responsabilidade</h2>
              <p>
                Em nenhuma circunstância o Cardápio Fácil, seus diretores, funcionários, parceiros ou agentes serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou incapacidade de usar o serviço.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Modificações do Serviço e dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, o serviço (ou qualquer parte dele) a qualquer momento, com ou sem aviso prévio. Também podemos revisar estes Termos de Uso a qualquer momento, a nosso critério. Ao continuar a usar o serviço após tais alterações, você concorda em estar vinculado aos termos revisados.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Lei Aplicável</h2>
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições de conflito de leis.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail: contato@cardapiofacil.online
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </PageLayout>
  );
};

export default TermsOfUse;
