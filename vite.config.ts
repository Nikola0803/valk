import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(false),
    __READDY_PROJECT_ID__: JSON.stringify(""),
    __READDY_VERSION_ID__: JSON.stringify(""),
    __READDY_AI_DOMAIN__: JSON.stringify(""),
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          react: [
            ["default", "React"],
            "useState", "useEffect", "useContext", "useReducer",
            "useCallback", "useMemo", "useRef", "useImperativeHandle",
            "useLayoutEffect", "useDebugValue", "useDeferredValue",
            "useId", "useInsertionEffect", "useSyncExternalStore",
            "useTransition", "startTransition", "lazy", "memo",
            "forwardRef", "createContext", "createElement",
            "cloneElement", "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate", "useLocation", "useParams", "useSearchParams",
            "Link", "NavLink", "Navigate", "Outlet",
          ],
        },
        { "react-i18next": ["useTranslation", "Trans"] },
      ],
      dts: true,
    }),
  ],
  base,
  build: { sourcemap: false, outDir: "dist" },
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      // Proxy Mailchimp API calls to avoid CORS + keep the API key
      // server-side. MAILCHIMP_API_KEY is deliberately NOT prefixed with
      // VITE_ - a VITE_ var gets inlined into the client bundle, which is
      // exactly what this proxy exists to avoid. Set it in a local .env
      // (gitignored) as MAILCHIMP_API_KEY=<key>-us9; this dev proxy is not
      // used in production - mirror the same header injection in your
      // production hosting layer instead (WP Nginx, Vercel, etc), reading
      // the key from that environment's own secret store.
      "/mailchimp": {
        target: "https://us9.api.mailchimp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mailchimp/, ""),
        headers: process.env.MAILCHIMP_API_KEY
          ? {
              Authorization:
                "Basic " +
                Buffer.from("x:" + process.env.MAILCHIMP_API_KEY).toString("base64"),
            }
          : undefined,
      },
    },
  },
});
