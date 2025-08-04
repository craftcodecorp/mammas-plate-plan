import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Mãe de 2 filhos",
    content: "Minha vida mudou! Não preciso mais ficar estressada pensando no que fazer para o almoço. As receitas são deliciosas e os ingredientes sempre frescos.",
    rating: 5,
    avatar: "👩‍🍳"
  },
  {
    name: "Ana Costa",
    role: "Mãe de bebê de 8 meses",
    content: "Perfeito para quem está introduzindo alimentação sólida. As sugestões são nutritivas e adequadas para a idade do meu filho.",
    rating: 5,
    avatar: "👶"
  },
  {
    name: "Rafael & Juliana",
    role: "Casal sem filhos",
    content: "Economizamos tempo e dinheiro. A lista de compras é super organizada e não desperdiçamos mais comida.",
    rating: 5,
    avatar: "👫"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que as famílias estão falando
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Centenas de famílias brasileiras já transformaram sua rotina alimentar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span>• Baseado em 127 avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;