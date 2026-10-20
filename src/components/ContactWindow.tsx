import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ExternalLink, ArrowLeft, Send } from 'lucide-react';
import { PortfolioData, SectionId, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface ContactWindowProps {
  contact: PortfolioData['contact'];
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onNavigateSection: (section: SectionId) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactWindow: React.FC<ContactWindowProps> = ({
  contact,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onNavigateSection,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim() || subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a subject line (at least 3 characters).';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusFeedback(null);

    if (!validate()) {
      return;
    }

    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject.trim()}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name.trim()}\nReply-To: ${email.trim()}\n\n${message.trim()}`
    );
    const mailtoHref = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoHref;
    setStatusFeedback(
      `Validation passed! Opened your default mail client addressed to ${contact.email}.`
    );
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contact.email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
    }
  };

  return (
    <WindowFrame
      id="contact"
      title="CONTACT.EXE"
      icon={<Mail size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="main-stage-window contact-window"
      statusBar={
        <div className="retro-status-row">
          <span>DIRECT LINE: {contact.phone}</span>
          <span className="retro-status-online">
            <span className="status-led status-led--online" aria-hidden="true" /> CHANNEL_READY
          </span>
        </div>
      }
    >
      <div className="section-toolbar">
        <span className="section-toolbar__title">
          DIRECT_TRANSMISSION // {contact.availability}
        </span>
        <button
          type="button"
          className="retro-btn"
          onClick={() => onNavigateSection('home')}
        >
          <ArrowLeft size={12} />
          <span>Back to HOME.EXE</span>
        </button>
      </div>

      <div className="contact-layout">
        {/* Left: Direct Coordinates */}
        <aside className="retro-subpanel contact-info-panel">
          <div className="retro-subpanel__header">
            <span className="retro-subpanel__title">Coordinates</span>
            <span className="retro-subpanel__code">NET_ADDR.CFG</span>
          </div>
          <div className="retro-subpanel__content contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-item__label">EMAIL_ADDRESS</span>
              <div className="contact-info-item__row">
                <a href={`mailto:${contact.email}`} className="contact-info-item__link">
                  {contact.email}
                </a>
                <button
                  type="button"
                  className="retro-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__label">PHONE / MOBILE</span>
              <div className="contact-info-item__row">
                <a href={`tel:${contact.phone}`} className="contact-info-item__link">
                  <Phone size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__label">LOCATION</span>
              <span className="contact-info-item__val">{contact.location}</span>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__label">STATUS</span>
              <span className="contact-info-item__val">{contact.availability}</span>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__label">GITHUB PROFILE</span>
              <div className="contact-info-links">
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn retro-btn--primary"
                >
                  <span>github.com/justlanee</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Validated Contact Form */}
        <section className="retro-subpanel contact-form-panel">
          <div className="retro-subpanel__header">
            <span className="retro-subpanel__title">Compose Message</span>
            <span className="retro-subpanel__code">MSG_COMPOSER.EXE</span>
          </div>
          <form className="retro-subpanel__content retro-form" onSubmit={handleSubmit} noValidate>
            <div className="retro-form__field">
              <label htmlFor="contact-name" className="retro-form__label">
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                className="retro-form__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <span id="err-name" className="retro-form__error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="retro-form__field">
              <label htmlFor="contact-email" className="retro-form__label">
                Your Email *
              </label>
              <input
                id="contact-email"
                type="email"
                className="retro-form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <span id="err-email" className="retro-form__error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="retro-form__field">
              <label htmlFor="contact-subject" className="retro-form__label">
                Subject *
              </label>
              <input
                id="contact-subject"
                type="text"
                className="retro-form__input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Embedded Systems / Computer Engineering Opportunity"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'err-subject' : undefined}
              />
              {errors.subject && (
                <span id="err-subject" className="retro-form__error" role="alert">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="retro-form__field">
              <label htmlFor="contact-message" className="retro-form__label">
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                className="retro-form__textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hello Jaslyn, I'd love to connect regarding..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'err-message' : undefined}
              />
              {errors.message && (
                <span id="err-message" className="retro-form__error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="retro-form__actions">
              <button type="submit" className="retro-btn retro-btn--primary">
                <Send size={13} />
                <span>VALIDATE & LAUNCH EMAIL CLIENT</span>
              </button>
            </div>

            {statusFeedback && (
              <div className="retro-form__feedback" role="status" aria-live="polite">
                {statusFeedback}
              </div>
            )}
          </form>
        </section>
      </div>
    </WindowFrame>
  );
};
