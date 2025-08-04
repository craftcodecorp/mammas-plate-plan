import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ChefHat, Users } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-elements";
import OptimizedImage from "@/components/ui/optimized-image";
import { useLanguage } from "@/lib/use-language";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: {
      "pt-BR": "Cardápio semanal para famílias com crianças pequenas",
      "en-US": "Weekly meal plan for families with young children"
    },
    description: {
      "pt-BR": "Um cardápio completo de 7 dias com receitas nutritivas e práticas que as crianças adoram.",
      "en-US": "A complete 7-day meal plan with nutritious and practical recipes that kids love."
    },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: {
      "pt-BR": "Cardápio Semanal",
      "en-US": "Weekly Menu"
    },
    date: "2025-07-28",
    readTime: {
      "pt-BR": "5 min de leitura",
      "en-US": "5 min read"
    },
    servings: 4,
    prepTime: {
      "pt-BR": "30 min",
      "en-US": "30 min"
    }
  },
  {
    id: 2,
    title: {
      "pt-BR": "10 receitas rápidas para dias corridos",
      "en-US": "10 quick recipes for busy days"
    },
    description: {
      "pt-BR": "Receitas deliciosas que ficam prontas em menos de 30 minutos para os dias mais agitados.",
      "en-US": "Delicious recipes ready in less than 30 minutes for your busiest days."
    },
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: {
      "pt-BR": "Receitas Rápidas",
      "en-US": "Quick Recipes"
    },
    date: "2025-07-21",
    readTime: {
      "pt-BR": "7 min de leitura",
      "en-US": "7 min read"
    },
    servings: 4,
    prepTime: {
      "pt-BR": "20 min",
      "en-US": "20 min"
    }
  },
  {
    id: 3,
    title: {
      "pt-BR": "Guia de introdução alimentar para bebês",
      "en-US": "Baby food introduction guide"
    },
    description: {
      "pt-BR": "Dicas e receitas para iniciar a introdução alimentar do seu bebê de forma segura e nutritiva.",
      "en-US": "Tips and recipes to start your baby's food introduction safely and nutritiously."
    },
    image: "https://images.unsplash.com/photo-1594614271360-0ed9a570ae15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: {
      "pt-BR": "Bebês",
      "en-US": "Babies"
    },
    date: "2025-07-14",
    readTime: {
      "pt-BR": "10 min de leitura",
      "en-US": "10 min read"
    },
    servings: 1,
    prepTime: {
      "pt-BR": "15 min",
      "en-US": "15 min"
    }
  }
];

const Blog = () => {
  const { language, t } = useLanguage();
  
  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt-BR' 
      ? date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="py-20 bg-background" id="blog">
      <div className="container mx-auto px-4">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {language === 'pt-BR' ? 'Blog e Receitas' : 'Blog & Recipes'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'pt-BR' 
              ? 'Dicas, cardápios e receitas para inspirar sua rotina alimentar' 
              : 'Tips, meal plans and recipes to inspire your meal routine'}
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title[language]}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary/90">
                    {post.category[language]}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{post.readTime[language]}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title[language]}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.description[language]}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{post.servings} {language === 'pt-BR' ? 'porções' : 'servings'}</span>
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="mr-1 h-4 w-4" />
                      <span>{post.prepTime[language]}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {language === 'pt-BR' ? 'Ler mais' : 'Read more'}
                  </Button>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            {language === 'pt-BR' ? 'Ver mais artigos' : 'View more articles'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
