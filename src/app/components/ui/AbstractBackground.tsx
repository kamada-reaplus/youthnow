export function AbstractBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Main abstract shapes using brand colors - 丸みを強調したデザイン */}

      {/* Large soft circular blob - より丸くソフトに */}
      <svg
        className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-8"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="primarySoftGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#00BCD4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="200" fill="url(#primarySoftGradient)" />
      </svg>

      {/* Medium organic blob shapes for white sections */}
      <svg
        className="absolute top-1/3 -left-10 w-[400px] h-[300px] opacity-12"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="organicBlob1" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFE44D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFC700" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <path
          d="M80,150 Q50,100 100,80 Q150,60 200,80 Q250,100 240,150 Q230,200 180,220 Q130,240 80,220 Q30,200 50,150 Q60,120 80,150 Z"
          fill="url(#organicBlob1)"
        />
      </svg>

      {/* Soft geometric shapes - 角を丸く */}
      <svg
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] opacity-6"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="softGeometricGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#00BCD4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFE44D" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* 丸みを帯びた三角形 */}
        <path
          d="M150,50 Q130,70 120,90 Q110,110 130,120 Q150,130 170,120 Q190,110 180,90 Q170,70 150,50 Z"
          fill="url(#softGeometricGradient)"
        />
        {/* 大きな円 */}
        <circle cx="100" cy="200" r="40" fill="#00BCD4" opacity="0.4" />
        {/* 丸い長方形 */}
        <rect
          x="180"
          y="180"
          width="60"
          height="60"
          rx="20"
          ry="20"
          fill="#FFD700"
          opacity="0.5"
        />
      </svg>

      {/* Flowing curved lines - より滑らかに */}
      <svg
        className="absolute top-2/3 left-0 w-full h-full opacity-4"
        viewBox="0 0 1400 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="flowSoftGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#00BCD4" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#FFE44D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 Q200,150 400,250 Q600,350 800,200 Q1000,50 1200,150 Q1350,200 1400,180"
          stroke="url(#flowSoftGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Scattered decorative circles - より多く、白いセクションでも見える */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-15"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hero section area */}
        <circle cx="150" cy="100" r="4" fill="#FFD700" />
        <circle cx="350" cy="80" r="3" fill="#4DD0E1" />
        <circle cx="550" cy="120" r="5" fill="#00BCD4" />

        {/* Problem section area */}
        <circle cx="100" cy="200" r="3" fill="#FFE44D" />
        <circle cx="300" cy="250" r="2" fill="#00BCD4" />
        <circle cx="500" cy="220" r="4" fill="#4DD0E1" />

        {/* VALUE section area */}
        <circle cx="200" cy="350" r="3" fill="#FFC700" />
        <circle cx="400" cy="380" r="2" fill="#4DD0E1" />
        <circle cx="600" cy="330" r="4" fill="#00BCD4" />

        {/* Why section area */}
        <circle cx="800" cy="180" r="3" fill="#FFD700" />
        <circle cx="1000" cy="220" r="2" fill="#4DD0E1" />
        <circle cx="1100" cy="200" r="3" fill="#00BCD4" />

        {/* Pricing section area */}
        <circle cx="150" cy="500" r="4" fill="#FFE44D" />
        <circle cx="350" cy="480" r="2" fill="#00BCD4" />
        <circle cx="550" cy="520" r="3" fill="#4DD0E1" />

        {/* FAQ section area */}
        <circle cx="900" cy="450" r="3" fill="#FFD700" />
        <circle cx="1100" cy="480" r="2" fill="#4DD0E1" />

        {/* Footer area */}
        <circle cx="250" cy="700" r="3" fill="#00BCD4" />
        <circle cx="450" cy="720" r="2" fill="#FFE44D" />
        <circle cx="650" cy="680" r="4" fill="#4DD0E1" />
      </svg>

      {/* Large organic wave at bottom - より丸く */}
      <svg
        className="absolute -bottom-20 left-0 w-full h-64 opacity-5"
        viewBox="0 0 1200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="organicWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#00BCD4" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#FFE44D" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q150,40 300,80 Q450,120 600,70 Q750,20 900,90 Q1050,160 1200,100 L1200,200 L0,200 Z"
          fill="url(#organicWaveGradient)"
        />
      </svg>

      {/* Additional floating circles for white backgrounds */}
      <svg
        className="absolute top-1/2 right-1/3 w-[200px] h-[200px] opacity-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="floatingCircle1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4DD0E1" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="60" fill="url(#floatingCircle1)" />
      </svg>

      <svg
        className="absolute top-3/4 left-1/4 w-[150px] h-[150px] opacity-8"
        viewBox="0 0 150 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="floatingCircle2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFE44D" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="75" cy="75" r="45" fill="url(#floatingCircle2)" />
      </svg>

      {/* Mobile-specific smaller shapes - より丸く */}
      <div className="md:hidden">
        <svg
          className="absolute top-20 right-5 w-20 h-20 opacity-15"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="mobileCircle1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4DD0E1" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="30" fill="url(#mobileCircle1)" />
        </svg>

        <svg
          className="absolute bottom-40 left-5 w-16 h-16 opacity-12"
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="mobileBlob1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFE44D" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <rect
            x="10"
            y="10"
            width="40"
            height="40"
            rx="15"
            ry="15"
            fill="url(#mobileBlob1)"
          />
        </svg>

        <svg
          className="absolute top-1/2 left-1/2 w-12 h-12 opacity-10"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="20" fill="#4DD0E1" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
