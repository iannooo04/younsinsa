import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

// [핵심 확인] 플러그인 경로가 src/i18n/request.ts를 정확히 가리키는지 확인
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // swcMinify: true, // 이미 설정되어 있다면 유지
  // reactStrictMode: true, // 이미 설정되어 있다면 유지

  // ✅ [수정] 외부 이미지 도메인 허용 설정 추가
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.msscdn.net",
      },
    ],
  },

  // [Alias 설정 유지] Webpack이 @/ 경로를 인식하도록 돕습니다.
  webpack: (config, { isServer, defaultLoaders }) => {
    // 💡 [핵심 수정] JSON 파일이 Webpack에 의해 올바르게 처리되도록 규칙을 추가합니다.
    config.module.rules.push({
      test: /\.json$/,
      // [중요] src/i18n/messages 경로의 JSON 파일을 강제로 포함하도록 설정
      include: path.join(__dirname, "src", "i18n", "messages"),
      type: "javascript/auto",
    });

    return config;
  },
};

export default withNextIntl(nextConfig);

// touch to force restart
