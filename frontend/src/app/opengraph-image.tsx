import {
  ImageResponse,
} from "next/og";

/* =========================================================
   OPEN GRAPH IMAGE
========================================================= */

export const alt =
  "Abdul Moiz Arsalan — Full-Stack Web Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

/* =========================================================
   IMAGE
========================================================= */

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",

          display: "flex",

          position:
            "relative",

          overflow:
            "hidden",

          background:
            "#07090d",

          color:
            "#f8fafc",

          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Cyan glow */}

        <div
          style={{
            position:
              "absolute",

            width:
              "500px",

            height:
              "500px",

            left:
              "-170px",

            top:
              "-180px",

            borderRadius:
              "999px",

            background:
              "rgba(34,211,238,0.14)",

            filter:
              "blur(90px)",
          }}
        />

        {/* Violet glow */}

        <div
          style={{
            position:
              "absolute",

            width:
              "550px",

            height:
              "550px",

            right:
              "-220px",

            bottom:
              "-250px",

            borderRadius:
              "999px",

            background:
              "rgba(139,92,246,0.15)",

            filter:
              "blur(100px)",
          }}
        />

        {/* Border */}

        <div
          style={{
            position:
              "absolute",

            inset:
              "32px",

            border:
              "1px solid #202735",

            borderRadius:
              "32px",
          }}
        />

        {/* Content */}

        <div
          style={{
            width:
              "100%",

            display:
              "flex",

            flexDirection:
              "column",

            justifyContent:
              "center",

            padding:
              "80px 100px",

            position:
              "relative",
          }}
        >
          {/* Label */}

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "12px",

              color:
                "#22d3ee",

              fontSize:
                "20px",

              letterSpacing:
                "4px",

              textTransform:
                "uppercase",
            }}
          >
            <div
              style={{
                width:
                  "8px",

                height:
                  "8px",

                borderRadius:
                  "999px",

                background:
                  "#34d399",
              }}
            />

            Portfolio / AMA
          </div>

          {/* Name */}

          <div
            style={{
              marginTop:
                "35px",

              fontSize:
                "72px",

              lineHeight:
                1,

              fontWeight:
                800,

              letterSpacing:
                "-4px",
            }}
          >
            Abdul Moiz Arsalan
          </div>

          {/* Role */}

          <div
            style={{
              marginTop:
                "18px",

              fontSize:
                "52px",

              lineHeight:
                1,

              fontWeight:
                700,

              color:
                "#67e8f9",
            }}
          >
            Full-Stack Web Developer
          </div>

          {/* Description */}

          <div
            style={{
              marginTop:
                "35px",

              maxWidth:
                "850px",

              fontSize:
                "24px",

              lineHeight:
                1.5,

              color:
                "#8b98aa",
            }}
          >
            Modern web experiences across frontend, backend,
            APIs and databases.
          </div>

          {/* Stack */}

          <div
            style={{
              marginTop:
                "45px",

              display:
                "flex",

              gap:
                "20px",

              fontSize:
                "18px",

              color:
                "#cbd5e1",
            }}
          >
            <span>
              Next.js
            </span>

            <span>
              /
            </span>

            <span>
              React
            </span>

            <span>
              /
            </span>

            <span>
              TypeScript
            </span>

            <span>
              /
            </span>

            <span>
              Laravel
            </span>

            <span>
              /
            </span>

            <span>
              MySQL
            </span>
          </div>
        </div>
      </div>
    ),

    {
      ...size,
    }
  );
}