'use client'
import { useEffect, useState } from 'react'

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const hCaptcha = event.target.querySelector(
      'textarea[name="h-captcha-response"]'
    )?.value;

    if (!hCaptcha) {
      setResult("Please complete the captcha");
      return;
    }

    setResult("Sending...");

    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      captcha: hCaptcha,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response.success) {
        setResult(response.message);
        event.target.reset();
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        setResult(response.message);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!document.querySelector('#hcaptcha-script')) {
      const script = document.createElement("script");
      script.id = "hcaptcha-script";
      script.src = "https://js.hcaptcha.com/1/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
      <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I&apos;d love to hear from you! Please use the form below.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            className="px-3 py-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="px-3 py-2 border rounded-md"
          />
        </div>

        <textarea
          rows="6"
          name="message"
          required
          placeholder="Enter your message"
          className="w-full px-4 py-2 border rounded-md mb-6"
        />

        {/* hCaptcha */}
        <div
          className="h-captcha mb-6"
          data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
        ></div>

        <button
          type="submit"
          className="py-2 px-8 bg-black text-white rounded-full mx-auto block"
        >
          Submit now
        </button>

        <p className="mt-4 text-center">{result}</p>
      </form>
    </div>
  );
}
