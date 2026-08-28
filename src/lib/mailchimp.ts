/**
 * Mailchimp Marketing API - Warrior Distributions
 *
 * Calls are proxied through /mailchimp → https://us9.api.mailchimp.com
 * so the API key never reaches the browser bundle.
 *
 * The API key itself is a server-side secret (MAILCHIMP_API_KEY, no VITE_
 * prefix so Vite never inlines it into the client bundle) injected into the
 * Authorization header by the proxy - see vite.config.ts (dev) and mirror
 * the same proxy in your production hosting layer (WP Nginx, Vercel, etc).
 * This file must never construct or send its own Authorization header; the
 * client only ever talks to the same-origin /mailchimp path.
 */

const BASE = "/mailchimp/3.0";

// Your list ID: Audience -> Manage Audience -> Settings -> Audience name & defaults -> Audience ID
export const LIST_ID = "YOUR_LIST_ID_HERE";

export const TAGS = {
  newsletter: "Newsletter",
  waitlist:   "Waitlist",
} as const;

export interface SubscribeOptions {
  email:       string;
  firstName?:  string;
  lastName?:   string;
  tags?:       string[];
  mergeFields?: Record<string, string>;
}

/**
 * PUT /lists/{id}/members/{md5(email)}
 * Safe to call for new OR existing contacts - won't throw "already subscribed".
 */
export async function subscribeToMailchimp(
  opts: SubscribeOptions
): Promise<{ ok: boolean; message?: string }> {
  const { email, firstName = "", lastName = "", tags = [], mergeFields = {} } = opts;
  const hash = md5(email.toLowerCase().trim());

  try {
    const res = await fetch(`${BASE}/lists/${LIST_ID}/members/${hash}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: email.toLowerCase().trim(),
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName, ...mergeFields },
        tags,
      }),
    });

    if (res.ok) return { ok: true };
    const err = await res.json().catch(() => ({})) as { detail?: string };
    return { ok: false, message: err.detail ?? "Subscription failed." };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}

// Pure-JS MD5 (Mailchimp member IDs are MD5 hashes of the email)
function md5(str: string): string {
  const safeAdd = (x: number, y: number) => {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
  };
  const rol = (n: number, c: number) => (n << c) | (n >>> (32 - c));
  const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) =>
    safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & c) | (~b & d), a, b, x, s, t);
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & d) | (c & ~d), a, b, x, s, t);
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(b ^ c ^ d, a, b, x, s, t);
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(c ^ (b | ~d), a, b, x, s, t);

  const m: number[] = new Array(Math.ceil((str.length + 9) / 64) * 16).fill(0);
  for (let i = 0; i < str.length; i++) m[i >> 2] |= (str.charCodeAt(i) & 0xff) << ((i % 4) * 8);
  m[str.length >> 2] |= 0x80 << ((str.length % 4) * 8);
  m[m.length - 2] = str.length * 8;

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  for (let i = 0; i < m.length; i += 16) {
    const [A, B, C, D] = [a, b, c, d];
    a=ff(a,b,c,d,m[i],7,-680876936);b=ff(d,a,b,c,m[i+1],12,-389564586);c=ff(c,d,a,b,m[i+2],17,606105819);d=ff(b,c,d,a,m[i+3],22,-1044525330);
    a=ff(a,b,c,d,m[i+4],7,-176418897);b=ff(d,a,b,c,m[i+5],12,1200080426);c=ff(c,d,a,b,m[i+6],17,-1473231341);d=ff(b,c,d,a,m[i+7],22,-45705983);
    a=ff(a,b,c,d,m[i+8],7,1770035416);b=ff(d,a,b,c,m[i+9],12,-1958414417);c=ff(c,d,a,b,m[i+10],17,-42063);d=ff(b,c,d,a,m[i+11],22,-1990404162);
    a=ff(a,b,c,d,m[i+12],7,1804603682);b=ff(d,a,b,c,m[i+13],12,-40341101);c=ff(c,d,a,b,m[i+14],17,-1502002290);d=ff(b,c,d,a,m[i+15],22,1236535329);
    a=gg(a,b,c,d,m[i+1],5,-165796510);b=gg(d,a,b,c,m[i+6],9,-1069501632);c=gg(c,d,a,b,m[i+11],14,643717713);d=gg(b,c,d,a,m[i],20,-373897302);
    a=gg(a,b,c,d,m[i+5],5,-701558691);b=gg(d,a,b,c,m[i+10],9,38016083);c=gg(c,d,a,b,m[i+15],14,-660478335);d=gg(b,c,d,a,m[i+4],20,-405537848);
    a=gg(a,b,c,d,m[i+9],5,568446438);b=gg(d,a,b,c,m[i+14],9,-1019803690);c=gg(c,d,a,b,m[i+3],14,-187363961);d=gg(b,c,d,a,m[i+8],20,1163531501);
    a=gg(a,b,c,d,m[i+13],5,-1444681467);b=gg(d,a,b,c,m[i+2],9,-51403784);c=gg(c,d,a,b,m[i+7],14,1735328473);d=gg(b,c,d,a,m[i+12],20,-1926607734);
    a=hh(a,b,c,d,m[i+5],4,-378558);b=hh(d,a,b,c,m[i+8],11,-2022574463);c=hh(c,d,a,b,m[i+11],16,1839030562);d=hh(b,c,d,a,m[i+14],23,-35309556);
    a=hh(a,b,c,d,m[i+1],4,-1530992060);b=hh(d,a,b,c,m[i+4],11,1272893353);c=hh(c,d,a,b,m[i+7],16,-155497632);d=hh(b,c,d,a,m[i+10],23,-1094730640);
    a=hh(a,b,c,d,m[i+13],4,681279174);b=hh(d,a,b,c,m[i],11,-358537222);c=hh(c,d,a,b,m[i+3],16,-722521979);d=hh(b,c,d,a,m[i+6],23,76029189);
    a=hh(a,b,c,d,m[i+9],4,-640364487);b=hh(d,a,b,c,m[i+12],11,-421815835);c=hh(c,d,a,b,m[i+15],16,530742520);d=hh(b,c,d,a,m[i+2],23,-995338651);
    a=ii(a,b,c,d,m[i],6,-198630844);b=ii(d,a,b,c,m[i+7],10,1126891415);c=ii(c,d,a,b,m[i+14],15,-1416354905);d=ii(b,c,d,a,m[i+5],21,-57434055);
    a=ii(a,b,c,d,m[i+12],6,1700485571);b=ii(d,a,b,c,m[i+3],10,-1894986606);c=ii(c,d,a,b,m[i+10],15,-1051523);d=ii(b,c,d,a,m[i+1],21,-2054922799);
    a=ii(a,b,c,d,m[i+8],6,1873313359);b=ii(d,a,b,c,m[i+15],10,-30611744);c=ii(c,d,a,b,m[i+6],15,-1560198380);d=ii(b,c,d,a,m[i+13],21,1309151649);
    a=ii(a,b,c,d,m[i+4],6,-145523070);b=ii(d,a,b,c,m[i+11],10,-1120210379);c=ii(c,d,a,b,m[i+2],15,718787259);d=ii(b,c,d,a,m[i+9],21,-343485551);
    a=safeAdd(a,A);b=safeAdd(b,B);c=safeAdd(c,C);d=safeAdd(d,D);
  }

  return [a,b,c,d].map(n => {
    // convert to unsigned hex, byte-swap to little-endian
    const h = (n >>> 0).toString(16).padStart(8, "0");
    return h.match(/../g)!.reverse().join("");
  }).join("");
}
