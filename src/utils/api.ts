/**
 * API utility for form submissions.
 *
 * Uses Formspree (https://formspree.io) as the backend — free, no server needed.
 * Configure via VITE_FORMSPREE_ID in your .env file.
 *
 * If FORMSPREE_ID is not set, submissions are logged to console (dev mode)
 * and resolved with a delay to simulate success for demo purposes.
 */

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

function isDemoMode(): boolean {
  return !FORMSPREE_ID;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

/**
 * Submit the contact form.
 * Returns { success: true } on success, or throws with an error message.
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  if (isDemoMode()) {
    console.log("[Demo] Contact form submission:", data);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));
    return { success: true };
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      _subject: `New inquiry from ${data.name} — Prestige Estates`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to send message. Please try again.");
  }

  return { success: true };
}

/**
 * Submit the newsletter signup.
 * Uses a separate Formspree form or the same one if only one ID is configured.
 */
export async function submitNewsletter(data: NewsletterData): Promise<{ success: boolean }> {
  if (isDemoMode()) {
    console.log("[Demo] Newsletter signup:", data);
    await new Promise((r) => setTimeout(r, 1000));
    return { success: true };
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      _subject: `Newsletter signup — Prestige Estates`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to subscribe. Please try again.");
  }

  return { success: true };
}
