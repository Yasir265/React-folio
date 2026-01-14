
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio";
import { useState } from "react";
import emailjs from "@emailjs/browser";

// ── Replace with YOUR real EmailJS credentials ──
const SERVICE_ID = "service_mxphxg7";           // service_xxxxxxxx
const TEMPLATE_ID = "template_7464ml8";         // template_xxxxxxxx  ← owner wala template
const PUBLIC_KEY = "x3Dj5QWHFUPB_on73";           // xxxxxxxxxxxxxxxxxxxx

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message is too short").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
        reply_to: data.email, // reply button ke liye helpful
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log("Success!", response.status, response.text);

      toast({
        title: "Message Sent!",
        description: "Thank you! You'll receive a confirmation email shortly.",
        variant: "default",
      });

      reset(); // Form clean ho jayega
    } catch (error: any) {
      console.error("EmailJS Error:", error?.text || error);
      toast({
        title: "Failed to send",
        description: "Please try again or email directly: muhammadyasir318@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "muhammadyasir318@gmail.com",
      href: "mailto:muhammadyasir318@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone || "+92 317 0271029",
      href: `tel:${(personalInfo.phone || "+923170271029").replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location || "Blue Area, Islamabad",
      href: "https://maps.app.goo.gl/8qbE1naX8A8y8ffn7",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30 py-20" ref={ref}>
      <div className="container-wide max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-5 p-5 rounded-xl bg-card/60 backdrop-blur-sm border hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {Object.entries(personalInfo.social || {}).map(([key, url]) => (
                  <a
                    key={key}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label={key}
                  >
                    {key.charAt(0).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-card/70 backdrop-blur-md p-8 md:p-10 rounded-2xl border shadow-sm">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Input placeholder="Your Name" {...register("name")} className="h-12" />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1.5">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      className="h-12"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Input placeholder="Subject" {...register("subject")} className="h-12" />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1.5">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message..."
                    rows={6}
                    {...register("message")}
                    className="resize-none min-h-[140px]"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1.5">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}