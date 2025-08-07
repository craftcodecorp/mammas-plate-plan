// Define available languages
export type Language = 'pt-BR' | 'en-US';

// Translation dictionaries
export const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    // Navigation
    'nav.how_it_works': 'Como Funciona',
    'nav.pricing': 'Preços',
    'nav.faq': 'FAQ',
    'nav.free_trial': 'Teste Grátis',
    
    // Hero section
    'hero.title': 'Cardápios semanais personalizados para sua família',
    'hero.subtitle': 'Receba no WhatsApp cardápios personalizados, lista de compras e receitas. Economize tempo e dinheiro, sem estresse.',
    'hero.cta': 'Comece Grátis',
    'hero.secondary_cta': 'Saiba Mais',
    'hero.cta.trial': 'Comece seu teste de 7 dias grátis',
    'hero.cta.no_commitment': '✨ Sem compromisso • Cancele quando quiser',
    'hero.whatsapp.badge': 'Receba no WhatsApp',
    
    // Hero carousel slides
    'hero.slide1.title': 'Planejamento de',
    'hero.slide1.subtitle': 'Refeições para Mães',
    'hero.slide1.tagline': 'Introdução alimentar e receitas práticas',
    'hero.slide1.description': 'Receba cardápios especiais para bebês iniciando sólidos e receitas práticas para toda a família, sem complicação.',
    'hero.slide1.alt': 'Mãe preparando refeição saudável para bebê',
    'hero.slide1.feature1': 'Introdução alimentar',
    'hero.slide1.feature2': 'Para toda família',
    'hero.slide1.feature3': 'Receitas rápidas',
    'hero.slide1.feature4': 'Lista organizada',
    
    'hero.slide2.title': 'Planejamento de',
    'hero.slide2.subtitle': 'Refeições Especiais',
    'hero.slide2.tagline': 'Respeitando suas restrições alimentares',
    'hero.slide2.description': 'Cardápios personalizados para vegetarianos, intolerantes à lactose, celíacos e outras necessidades específicas.',
    'hero.slide2.alt': 'Pessoa preparando refeição com alimentos para dietas especiais',
    'hero.slide2.feature1': 'Sem restrições',
    'hero.slide2.feature2': 'Nutrição balanceada',
    'hero.slide2.feature3': 'Entrega semanal',
    'hero.slide2.feature4': 'Ingredientes certos',
    
    'hero.slide3.title': 'Planejamento de',
    'hero.slide3.subtitle': 'Refeições Práticas',
    'hero.slide3.tagline': 'Para profissionais ocupados',
    'hero.slide3.description': 'Cardápios otimizados para quem tem pouco tempo, mas não abre mão de uma alimentação saudável e saborosa.',
    'hero.slide3.alt': 'Profissional ocupado preparando refeição rápida e saudável',
    'hero.slide3.feature1': 'Vida corrida',
    'hero.slide3.feature2': 'Casais e solteiros',
    'hero.slide3.feature3': 'Preparo rápido',
    'hero.slide3.feature4': 'Compra eficiente',
    
    // Features section
    'features.title': 'Cardápios que se adaptam à sua família',
    'features.subtitle': 'Soluções práticas para o dia a dia',
    'features.personalized.title': 'Personalizado',
    'features.personalized.description': 'Cardápios adaptados às preferências e restrições alimentares da sua família.',
    'features.practical.title': 'Prático',
    'features.practical.description': 'Receba tudo pelo WhatsApp, sem precisar baixar aplicativos ou fazer login.',
    'features.economical.title': 'Econômico',
    'features.economical.description': 'Economize tempo e dinheiro com listas de compras otimizadas e receitas aproveitáveis.',
    'features.nutritious.title': 'Nutritivo',
    'features.nutritious.description': 'Cardápios elaborados por nutricionistas, garantindo refeições balanceadas.',
    'features.adaptable.title': 'Adaptável',
    'features.adaptable.description': 'Receitas que se adaptam à rotina da sua família, com opções rápidas para dias corridos.',
    'features.supportive.title': 'Suporte',
    'features.supportive.description': 'Atendimento personalizado para ajustar seu cardápio quando necessário.',
    
    // How it works section
    'how.title': 'Como Funciona',
    'how.subtitle': 'Três passos simples para transformar sua rotina alimentar',
    'how.step1.title': 'Cadastre-se',
    'how.step1.description': 'Preencha um breve questionário sobre sua família, preferências e restrições alimentares.',
    'how.step2.title': 'Receba seu cardápio',
    'how.step2.description': 'Toda semana você receberá no WhatsApp um cardápio personalizado com lista de compras.',
    'how.step3.title': 'Prepare as refeições',
    'how.step3.description': 'Siga as receitas simples e práticas para preparar refeições deliciosas para sua família.',
    
    // Pricing section
    'pricing.title': 'Planos e Preços',
    'pricing.subtitle': 'Escolha o plano ideal para sua família',
    'pricing.monthly.title': 'Mensal',
    'pricing.monthly.price': 'R$29,90',
    'pricing.monthly.period': '/mês',
    'pricing.monthly.description': 'Ideal para experimentar o serviço',
    'pricing.quarterly.title': 'Trimestral',
    'pricing.quarterly.price': 'R$79,90',
    'pricing.quarterly.period': '/trimestre',
    'pricing.quarterly.description': 'Economize R$9,80 por trimestre',
    'pricing.annual.title': 'Anual',
    'pricing.annual.price': 'R$299,90',
    'pricing.annual.period': '/ano',
    'pricing.annual.description': 'Economize R$58,90 por ano',
    'pricing.feature.cardapios': 'Cardápios semanais personalizados',
    'pricing.feature.lista': 'Lista de compras organizada',
    'pricing.feature.receitas': 'Receitas detalhadas',
    'pricing.feature.ajustes': 'Ajustes sob demanda',
    'pricing.feature.suporte': 'Suporte via WhatsApp',
    'pricing.cta': 'Começar Agora',
    'pricing.trial': 'Teste grátis de 7 dias',
    
    // FAQ section
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Tire suas dúvidas sobre o Cardápio Fácil e como podemos ajudar sua família',
    
    // CTA section
    'cta.title': 'Pronto para simplificar sua rotina alimentar?',
    'cta.subtitle': 'Experimente o Cardápio Fácil gratuitamente por 7 dias',
    'cta.button': 'Começar Teste Grátis',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Política de Privacidade',
    'footer.contact': 'Contato',
    
    // Theme toggle
    'theme.toggle': 'Alternar tema',
    
    // Language toggle
    'language.toggle': 'Mudar idioma',
    'language.pt': 'Português',
    'language.en': 'English'
  },
  'en-US': {
    // Navigation
    'nav.how_it_works': 'How It Works',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.free_trial': 'Free Trial',
    
    // Hero section
    'hero.title': 'Personalized weekly meal plans for your family',
    'hero.subtitle': 'Receive personalized meal plans, shopping lists, and recipes via WhatsApp. Save time and money, without stress.',
    'hero.cta': 'Start Free',
    'hero.secondary_cta': 'Learn More',
    'hero.cta.trial': 'Start your 14-day free trial',
    'hero.cta.no_commitment': '✨ No commitment • Cancel anytime',
    'hero.whatsapp.badge': 'Receive on WhatsApp',
    
    // Hero carousel slides
    'hero.slide1.title': 'Meal Planning',
    'hero.slide1.subtitle': 'For Mothers',
    'hero.slide1.tagline': 'Baby food introduction and practical recipes',
    'hero.slide1.description': 'Receive special meal plans for babies starting solids and practical recipes for the whole family, without complications.',
    'hero.slide1.alt': 'Mother preparing healthy meal for baby',
    'hero.slide1.feature1': 'Baby food introduction',
    'hero.slide1.feature2': 'For the whole family',
    'hero.slide1.feature3': 'Quick recipes',
    'hero.slide1.feature4': 'Organized shopping list',
    
    'hero.slide2.title': 'Meal Planning',
    'hero.slide2.subtitle': 'For Special Diets',
    'hero.slide2.tagline': 'Respecting your dietary restrictions',
    'hero.slide2.description': 'Customized meal plans for vegetarians, lactose intolerant, celiacs, and other specific dietary needs.',
    'hero.slide2.alt': 'Person preparing meal with special diet foods',
    'hero.slide2.feature1': 'No restrictions',
    'hero.slide2.feature2': 'Balanced nutrition',
    'hero.slide2.feature3': 'Weekly delivery',
    'hero.slide2.feature4': 'Right ingredients',
    
    'hero.slide3.title': 'Meal Planning',
    'hero.slide3.subtitle': 'For Busy Professionals',
    'hero.slide3.tagline': 'For busy professionals',
    'hero.slide3.description': 'Optimized meal plans for those with little time, but who don\'t compromise on healthy and tasty food.',
    'hero.slide3.alt': 'Busy professional preparing quick and healthy meal',
    'hero.slide3.feature1': 'Busy lifestyle',
    'hero.slide3.feature2': 'Singles and couples',
    'hero.slide3.feature3': 'Quick preparation',
    'hero.slide3.feature4': 'Efficient shopping',
    
    // Features section
    'features.title': 'Meal plans that adapt to your family',
    'features.subtitle': 'Practical solutions for everyday life',
    'features.personalized.title': 'Personalized',
    'features.personalized.description': 'Meal plans adapted to your family\'s preferences and dietary restrictions.',
    'features.practical.title': 'Practical',
    'features.practical.description': 'Receive everything via WhatsApp, no need to download apps or log in.',
    'features.economical.title': 'Economical',
    'features.economical.description': 'Save time and money with optimized shopping lists and reusable recipes.',
    'features.nutritious.title': 'Nutritious',
    'features.nutritious.description': 'Meal plans created by nutritionists, ensuring balanced meals.',
    'features.adaptable.title': 'Adaptable',
    'features.adaptable.description': 'Recipes that adapt to your family\'s routine, with quick options for busy days.',
    'features.supportive.title': 'Support',
    'features.supportive.description': 'Personalized assistance to adjust your meal plan when needed.',
    
    // How it works section
    'how.title': 'How It Works',
    'how.subtitle': 'Three simple steps to transform your meal routine',
    'how.step1.title': 'Sign Up',
    'how.step1.description': 'Fill out a brief questionnaire about your family, preferences, and dietary restrictions.',
    'how.step2.title': 'Receive your meal plan',
    'how.step2.description': 'Every week you\'ll receive a personalized meal plan with a shopping list via WhatsApp.',
    'how.step3.title': 'Prepare the meals',
    'how.step3.description': 'Follow the simple and practical recipes to prepare delicious meals for your family.',
    
    // Pricing section
    'pricing.title': 'Plans and Pricing',
    'pricing.subtitle': 'Choose the ideal plan for your family',
    'pricing.monthly.title': 'Monthly',
    'pricing.monthly.price': '$5.99',
    'pricing.monthly.period': '/month',
    'pricing.monthly.description': 'Ideal for trying out the service',
    'pricing.quarterly.title': 'Quarterly',
    'pricing.quarterly.price': '$15.99',
    'pricing.quarterly.period': '/quarter',
    'pricing.quarterly.description': 'Save $2 per quarter',
    'pricing.annual.title': 'Annual',
    'pricing.annual.price': '$59.99',
    'pricing.annual.period': '/year',
    'pricing.annual.description': 'Save $12 per year',
    'pricing.feature.cardapios': 'Personalized weekly meal plans',
    'pricing.feature.lista': 'Organized shopping list',
    'pricing.feature.receitas': 'Detailed recipes',
    'pricing.feature.ajustes': 'On-demand adjustments',
    'pricing.feature.suporte': 'WhatsApp support',
    'pricing.cta': 'Start Now',
    'pricing.trial': '14-day free trial',
    
    // FAQ section
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Get answers about Easy Meal Plan and how we can help your family',
    
    // CTA section
    'cta.title': 'Ready to simplify your meal routine?',
    'cta.subtitle': 'Try Easy Meal Plan for free for 14 days',
    'cta.button': 'Start Free Trial',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    
    // Theme toggle
    'theme.toggle': 'Toggle theme',
    
    // Language toggle
    'language.toggle': 'Change language',
    'language.pt': 'Português',
    'language.en': 'English'
  }
};
