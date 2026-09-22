import React from 'react';

export const metadata = {
  title: 'Child Safety Standards | [Your App Name]',
  description: 'Child Safety Policy and CSAE Prevention Standards for [Your App Name].',
};

export default function ChildSafetyPage() {
  const APP_NAME = "Studiospace "; 
  const DEVELOPER_NAME = "Harry"; 
  const CONTACT_EMAIL = "harry@studiospace.art";
  const EFFECTIVE_DATE = "October 24, 2026"; 

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <header className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Child Safety Standards
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            <strong>App Name:</strong> {APP_NAME} | <strong>Developer:</strong> {DEVELOPER_NAME}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            <strong>Effective Date:</strong> {EFFECTIVE_DATE}
          </p>
        </header>

        <article className="space-y-8 text-slate-700 leading-relaxed">
          
          {/* Statement */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Our Commitment to Child Safety
            </h2>
            <p>
              At <strong>{APP_NAME}</strong> (developed by <strong>{DEVELOPER_NAME}</strong>), we maintain a zero-tolerance policy against any form of child sexual abuse, exploitation, or harm. We are committed to providing a safe, secure, and appropriate environment for all users.
            </p>
          </section>

          {/* Prohibition of CSAE */}
          <section className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Prohibition of CSAE (Child Sexual Abuse and Exploitation)
            </h2>
            <p className="text-red-800 text-sm">
              Child Sexual Abuse Material (CSAM) and Child Sexual Exploitation and Abuse (CSAE) are <strong>strictly prohibited</strong> on our app and related services. We strictly forbid users from creating, uploading, sharing, or soliciting any content or behavior that harms or exploits children in any manner.
            </p>
          </section>

          {/* Safety Policies & Enforcement */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Enforcement & Prevention Policy
            </h2>
            <p className="mb-3">
              To ensure full compliance with global safety standards and legal obligations, we employ the following policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Immediate Account Termination:</strong> Any user found sharing, storing, or attempting to distribute CSAE content will face immediate and permanent suspension.
              </li>
              <li>
                <strong>Content Moderation:</strong> We actively monitor, filter, and review reported content to identify and prevent harmful material.
              </li>
              <li>
                <strong>Legal Reporting:</strong> Any detected instance of CSAE will be reported immediately to national and international law enforcement bodies, including the National Center for Missing & Exploited Children (NCMEC).
              </li>
            </ul>
          </section>

          {/* Reporting Procedure */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Reporting Procedure
            </h2>
            <p className="mb-3">
              If you discover or suspect any child safety violations, illegal content, or exploitation on our platform, please report it immediately:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Send an email directly to our dedicated Child Safety team at:{" "}
                <a 
                  href={`mailto:${CONTACT_EMAIL}`} 
                  className="text-blue-600 font-medium hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>Include detailed information, such as screenshots, user handles, or links, to help us investigate quickly.</li>
              <li>Our dedicated safety team reviews high-priority reports within 24 hours and takes immediate corrective action.</li>
            </ol>
          </section>

          {/* Contact Information */}
          <section className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Child Safety Contact
            </h2>
            <p>
              For inquiries regarding our child protection policies or safety compliance, reach out to us at:
            </p>
            <div className="mt-3 bg-slate-100 p-4 rounded-lg font-mono text-sm">
              <p><strong>Email:</strong> {CONTACT_EMAIL}</p>
              <p><strong>Developer:</strong> {DEVELOPER_NAME}</p>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}