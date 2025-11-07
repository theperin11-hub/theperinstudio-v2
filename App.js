
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

/* =======================
   CONFIG (provided by you)
   =======================
*/
const EMAIL_SERVICE = "service_vyl1evr";
const EMAIL_TEMPLATE = "template_45qu6dd";
const EMAIL_PUBLIC_KEY = "6lJulpjGuYHLvwNiD";
const WHATSAPP_RECIPIENTS = ["+919983214970", "+917357991069"];
const INSTA_URL = "https://www.instagram.com/theperin11";
const YT_URL = "https://youtube.com/@monukeblogs?si=--eMZKdC65v1oBYr";

emailjs.init(EMAIL_PUBLIC_KEY);

/* =======================
   GALLERY ITEMS (all links you provided, categorized)
   Each item: { src, section, caption_en, caption_hi (optional) }
   ======================= */
const GALLERY_ITEMS = [
  { src: "https://i.ibb.co/mV8spB1L/Picsart-25-11-05-11-31-25-300.jpg", section: "Couple", caption_en: "Golden twilight — soft candid moment.", caption_hi: "शाम का जादू, एक भावनात्मक पल।" },
  { src: "https://i.ibb.co/3ywgNYVF/Picsart-25-11-05-11-33-10-592.jpg", section: "Couple", caption_en: "A whisper between them.", caption_hi: "" },
  { src: "https://i.ibb.co/xS86jtXt/Picsart-25-11-05-11-38-12-309.jpg", section: "Couple", caption_en: "Timeless portrait of love.", caption_hi: "" },
  { src: "https://i.ibb.co/fGxS8P9S/Picsart-25-11-05-11-28-42-736.jpg", section: "Portrait", caption_en: "Classic portrait — elegant lighting.", caption_hi: "" },
  { src: "https://i.ibb.co/zVMCWF8W/Picsart-25-11-05-11-50-56-048.jpg", section: "Group", caption_en: "Laughter that ties friends together.", caption_hi: "" },
  { src: "https://i.ibb.co/FbbhrLyR/Picsart-25-11-05-11-43-08-207.jpg", section: "Bride", caption_en: "Bride's quiet moment before the vows.", caption_hi: "" },
  { src: "https://i.ibb.co/Y7MD5Xr7/Picsart-25-11-05-18-19-10-864.jpg", section: "Portrait", caption_en: "Soft light portrait.", caption_hi: "" },
  { src: "https://i.ibb.co/HDQzHp0j/Picsart-25-11-05-18-21-39-066.jpg", section: "Portrait", caption_en: "Poised and confident.", caption_hi: "" },
  { src: "https://i.ibb.co/ksmNZPZ0/Picsart-25-11-05-18-20-25-160.jpg", section: "Bride", caption_en: "Bride's laughter captured.", caption_hi: "" },
  { src: "https://i.ibb.co/vCRPzzh2/Picsart-25-11-05-17-16-57-129.jpg", section: "Group", caption_en: "Family warmth.", caption_hi: "" },
  { src: "https://i.ibb.co/Q37dJZ86/Picsart-25-11-05-17-21-22-114.jpg", section: "Couple", caption_en: "Cinematically framed.", caption_hi: "" },
  { src: "https://i.ibb.co/hF9qtkGK/aastha-bansal-W1wkx5kca-Bk-unsplash.jpg", section: "Portrait", caption_en: "Editorial style portrait.", caption_hi: "" },
  { src: "https://i.ibb.co/vxgbpBTr/Picsart-25-11-05-18-25-56-817.jpg", section: "Baby", caption_en: "Tiny hands, big love.", caption_hi: "" },
  { src: "https://i.ibb.co/3mKz0Vnw/Picsart-25-11-05-18-24-56-672.jpg", section: "Haldi", caption_en: "Colors of celebration.", caption_hi: "" },
  { src: "https://i.ibb.co/b5DSKXTJ/Picsart-25-11-05-18-27-04-386.jpg", section: "Haldi", caption_en: "Festival of smiles.", caption_hi: "" },
  { src: "https://i.ibb.co/0yKmVhKV/Picsart-25-11-05-19-30-13-803.jpg", section: "Portrait", caption_en: "Quiet strength.", caption_hi: "" },
  { src: "https://i.ibb.co/ddx6tkz/Picsart-25-11-05-19-13-35-166.jpg", section: "Group", caption_en: "Joyful chaos.", caption_hi: "" },
  { src: "https://i.ibb.co/MDtFGWVF/Picsart-25-11-05-19-32-32-811.jpg", section: "Couple", caption_en: "Intimate frame.", caption_hi: "" },
  { src: "https://i.ibb.co/2YHSYVcC/Picsart-25-11-05-19-31-07-407.jpg", section: "Portrait", caption_en: "Candid emotion.", caption_hi: "" },
  { src: "https://i.ibb.co/0RR11KCr/Picsart-25-11-05-19-12-13-067.jpg", section: "Couple", caption_en: "Light & shadow.", caption_hi: "" },
  { src: "https://i.ibb.co/v6HZ98x8/Picsart-25-11-05-19-31-59-619.jpg", section: "Group", caption_en: "Ceremony pulse.", caption_hi: "" },
  { src: "https://i.ibb.co/cKFmjHSw/Picsart-25-11-05-19-21-51-123.jpg", section: "Couple", caption_en: "A stolen moment.", caption_hi: "" }
];

const SECTIONS = ["Bride","Groom","Couple","Portrait","Group","Haldi","Baby"];

export default function App(){
  const [activeSection,setActiveSection] = useState("All");
  const [lightboxIndex,setLightboxIndex] = useState(null);
  const [form,setForm] = useState({ name:"", phone:"", email:"", service:"Wedding - Full Day", message:"", date:"" });
  const [sending,setSending] = useState(false);
  const [status,setStatus] = useState(null);

  useEffect(()=>{ document.title = "The Perin Studio — Cinematic Photography"; },[]);

  // filter list depending on section
  const filtered = activeSection === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.section === activeSection);

  function openLightbox(idx){
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function handleChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!form.name || !form.phone){
      setStatus({ type: "error", text: "Name and phone are required."});
      return;
    }
    setSending(true); setStatus(null);

    const templateParams = {
      from_name: form.name,
      phone: form.phone,
      reply_to: form.email || "no-email",
      service: form.service,
      message: `Date: ${form.date}\n\n${form.message}`
    };

    try {
      await emailjs.send(EMAIL_SERVICE, EMAIL_TEMPLATE, templateParams);
      // call Netlify function to send WhatsApp (non-blocking)
      fetch("/.netlify/functions/sendWhatsApp", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ numbers: WHATSAPP_RECIPIENTS, payload: templateParams })
      }).catch(()=>{/* ignore errors on client side */});

      setStatus({ type: "success", text: "Request sent! We'll contact you shortly." });
      setForm({ name:"", phone:"", email:"", service:"Wedding - Full Day", message:"", date:"" });
    } catch(err){
      console.error(err);
      setStatus({ type: "error", text: "Failed to send. Check configuration." });
    } finally {
      setSending(false);
    }
  }

  function openWhatsappClientPreview(){
    const msg = encodeURIComponent(`New booking request from website.%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AService: ${form.service}%0ADate: ${form.date}%0AMessage: ${form.message}`);
    const number = "919983214970";
    window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
  }

  return (
    <div className="site">
      <header className="navbar">
        <div className="left">
          <img className="logo-img" src="https://i.ibb.co/xKy834SY/file-00000000475871f685ecef14897738f6.png" alt="logo" />
          <div className="brand">
            <div className="studio">The Perin Studio</div>
            <div className="tag">Cinematic Wedding & Portraits</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#hero">Home</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="right">
          <a className="icon" href={INSTA_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a className="icon" href={YT_URL} target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </header>

      <section id="hero" className="hero">
        <div className="hero-inner">
          <h1>Every Frame Tells a Story</h1>
          <p>Cinematic Wedding & Portrait Photography — Honest • Emotional • Timeless.</p>
          <div className="hero-cta">
            <a href="#portfolio" className="btn primary">View Portfolio</a>
            <a href="#contact" className="btn outline">Book Now</a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio">
        <h2>Featured Portfolio</h2>
        <p className="muted">Selected cinematic moments from recent shoots.</p>
        <div className="portfolio-grid">
          {GALLERY_ITEMS.slice(0,6).map((g, i) => (
            <div className="pf-item" key={i} data-aos="fade-up">
              <img src={g.src} alt={`pf-${i}`} />
              <div className="pf-caption">
                <h4>{g.section}</h4>
                <p>{g.caption_en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery">
        <h2>Gallery</h2>
        <p className="muted">Explore by category — click any image for full view.</p>

        <div className="section-filter">
          <button className={activeSection==="All"?"active":""} onClick={()=>setActiveSection("All")}>All</button>
          {SECTIONS.map(s => <button key={s} className={activeSection===s?"active":""} onClick={()=>setActiveSection(s)}>{s}</button>)}
        </div>

        <div className="gallery-grid">
          {filtered.map((g, i) => (
            <div className="gallery-card" key={g.src} data-aos="zoom-in">
              <img src={g.src} alt={`g-${i}`} onClick={()=>openLightbox(i)} />
              <div className="gallery-caption">
                <strong>{g.section}</strong>
                <p>{g.caption_en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews">
        <h2>Clients' Words</h2>
        <div className="reviews-grid">
          <div className="review-card" data-aos="fade-up">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The Perin Studio made our wedding look like a movie — forever grateful."</p>
            <p className="author">— Ritika & Aman</p>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Candid moments captured beautifully. Highly recommended."</p>
            <p className="author">— Anjali Sharma</p>
          </div>
        </div>
      </section>

      <section id="about" className="story">
        <h2>Our Story</h2>
        <p>At <strong>The Perin Studio</strong> we craft cinematic stories. We blend lighting, motion and emotion to create images that last a lifetime — genuine, cinematic and timeless.</p>
      </section>

      <section id="contact" className="contact">
        <h2>Let's Connect</h2>
        <p className="muted">📍 Ward No. 2, Dwarkapuri Colony, Front of Hanuman Ji Mandir, Gangapur City – 322201, Rajasthan</p>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" />
            <input name="date" value={form.date} onChange={handleChange} placeholder="Preferred Date (DD-MM-YYYY)" />
            <select name="service" value={form.service} onChange={handleChange}>
              <option>Wedding - Full Day</option>
              <option>Pre-Wedding Shoot</option>
              <option>Engagement Ceremony</option>
              <option>Event / Function</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your event..." rows="4" />
            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={sending}>{sending ? "Sending..." : "Send Request"}</button>
              <button type="button" className="btn outline" onClick={openWhatsappClientPreview}>Open WhatsApp (preview)</button>
            </div>
            {status && <p className={status.type==="success"?"success":"error"}>{status.text}</p>}
          </form>

          <div className="contact-info">
            <h4>Contact</h4>
            <p>📞 <a href="tel:9983214970">9983214970</a> / <a href="tel:7357991069">7357991069</a></p>
            <p>✉️ <a href="mailto:theperin11@gmail.com">theperin11@gmail.com</a></p>
            <p>Instagram: <a href={INSTA_URL} target="_blank" rel="noreferrer">{INSTA_URL}</a></p>
            <div className="map">
              <iframe title="Perin location" src="https://www.google.com/maps?q=Ward+No.+2,+Dwarkapuri+Colony,+Gangapur+City+322201&z=17&output=embed" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© {new Date().getFullYear()} The Perin Studio</div>
        <div>Designed with ❤️</div>
      </footer>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lb-close" onClick={closeLightbox}>✕</button>
          <img src={filtered[lightboxIndex]?.src || filtered[0].src} alt="lightbox" />
        </div>
      )}
    </div>
  );
}