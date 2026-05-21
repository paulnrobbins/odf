'use client';

/**
 * Beliefs — Statement of Faith
 * ────────────────────────────
 * Eight doctrinal items rendered as a clean vertical reading list. Each item
 * uses semantic <dl>/<dt>/<dd> markup so screen readers and search engines
 * understand the "term + definition" relationship. Scripture references sit
 * in the lamplight accent italic underneath each body.
 *
 * Placed between the Leadership and AtTheCross sections in the scroll order:
 * meet the pastors \u2192 see what they believe \u2192 arrive at the cross.
 */

import { statementOfFaith } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Beliefs() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section
      ref={ref}
      id="beliefs"
      className="section section-veil"
      aria-label="What we believe"
    >
      <div className="container-editorial">
        <p className="eyebrow mb-6 reveal">{statementOfFaith.eyebrow}</p>
        <h2 className="font-display text-display-lg text-balance text-[var(--color-walnut)] reveal">
          {statementOfFaith.headline}
        </h2>
        <p className="mt-6 text-body-lg text-[var(--color-walnut-mid)] max-w-readable text-pretty reveal">
          {statementOfFaith.intro}
        </p>

        <dl className="mt-20 max-w-readable">
          {statementOfFaith.items.map((item, idx) => (
            <div
              key={item.id}
              className={
                'reveal pt-10 pb-10' +
                (idx > 0 ? ' border-t border-[var(--color-walnut)]/12' : '')
              }
            >
              <dt className="font-display text-display-sm text-[var(--color-walnut)] text-balance">
                {item.title}
              </dt>
              <dd className="mt-5">
                <p className="text-body-lg text-[var(--color-walnut-mid)] text-pretty">
                  {item.body}
                </p>
                <p className="mt-5 text-body-sm font-italic text-[var(--color-lamplight-deep)] tracking-tight">
                  {item.scripture}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
