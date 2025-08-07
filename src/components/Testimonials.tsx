import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/use-language";

// Create testimonials array dynamically using translation keys
const createTestimonials = (t: (key: string) => string) => [
  {
    name: t('testimonials.component.testimonial1.name'),
    role: t('testimonials.component.testimonial1.role'),
    content: t('testimonials.component.testimonial1.content'),
    rating: 5,
    avatar: t('testimonials.component.testimonial1.avatar')
  },
  {
    name: t('testimonials.component.testimonial2.name'),
    role: t('testimonials.component.testimonial2.role'),
    content: t('testimonials.component.testimonial2.content'),
    rating: 5,
    avatar: t('testimonials.component.testimonial2.avatar')
  },
  {
    name: t('testimonials.component.testimonial3.name'),
    role: t('testimonials.component.testimonial3.role'),
    content: t('testimonials.component.testimonial3.content'),
    rating: 5,
    avatar: t('testimonials.component.testimonial3.avatar')
  },
  {
    name: t('testimonials.component.testimonial4.name'),
    role: t('testimonials.component.testimonial4.role'),
    content: t('testimonials.component.testimonial4.content'),
    rating: 5,
    avatar: t('testimonials.component.testimonial4.avatar')
  }
];

const Testimonials = () => {
  const { t } = useLanguage();
  
  // Generate testimonials using the translation function
  const testimonials = createTestimonials(t);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.component.heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.component.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <span>• {t('testimonials.component.rating.text')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;