import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router";

import { Logo } from "./Logo";

const testimonials = [
  {
    quote:
      "This SRM platform has completely transformed how we manage supplier relationships. The most elegant and intuitive system I've ever used. This is a dream come true.",
    author: "@KenTheRogers",
    avatar:
      "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  },
  {
    quote:
      "Having well-organized supplier data with real-time analytics and collaboration tools in one place is just a classy move all around. Pure productivity delight. A+++.",
    author: "@CodiferousCoder",
    avatar:
      "https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80",
  },
];

export function AuthLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const isForgotPassword = location.pathname === "/dashboard/forgot-password";

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1c1917] text-white">
        <div className="p-6">
          <Logo />
        </div>
        <Outlet />
      </div>
    );
  }

  const testimonialIndex = location.pathname === "/dashboard/sign-up" ? 0 : 1;
  const testimonial = testimonials[testimonialIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#1c1917] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 absolute top-0 left-0 right-0 z-10">
        <Logo />
        <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border border-app-border text-neutral-400">
          <BookOpen size={14} />
          {t("common.documentation")}
        </button>
      </div>

      {/* Split layout */}
      <div className="flex flex-1">
        {/* Left panel */}
        <div className="flex flex-col justify-center px-12 py-24 w-full max-w-[600px] min-h-screen">
          <Outlet />
        </div>

        {/* Right panel */}
        <div className="flex-1 hidden md:flex flex-col items-center justify-center px-16 bg-[#141410]">
          <div className="max-w-xl">
            <div
              className="mb-6 text-[80px] leading-none text-brand opacity-40"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </div>
            <p className="text-white text-[28px] leading-[1.4] font-normal mb-8">
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-app-border"
              />
              <span className="text-neutral-300">{testimonial.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
