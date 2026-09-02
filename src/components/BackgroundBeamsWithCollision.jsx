import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./BackgroundBeamsWithCollision.css";

export const BackgroundBeamsWithCollision = ({
  children,
  className = "",
}) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  // We use percentages for initialX to distribute them beautifully across all screen sizes (responsiveness)
  const beams = [
    {
      initialX: "8%",
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: "22%",
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: "38%",
      duration: 8,
      repeatDelay: 6,
      className: "beam-h-6",
    },
    {
      initialX: "52%",
      duration: 5,
      repeatDelay: 12,
      delay: 3,
    },
    {
      initialX: "68%",
      duration: 11,
      repeatDelay: 2,
      className: "beam-h-20",
    },
    {
      initialX: "82%",
      duration: 4,
      repeatDelay: 2,
      className: "beam-h-12",
    },
    {
      initialX: "94%",
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "beam-h-6",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={`beams-background-container ${className}`}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={beam.initialX + "-idx-" + index}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="beams-collision-boundary"
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef(null);
  const tweenRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  // GSAP beam travel animation — replaces motion.div with repeat: Infinity
  useEffect(() => {
    if (!beamRef.current) return;

    // Kill any previous tween
    if (tweenRef.current) tweenRef.current.kill();

    gsap.set(beamRef.current, { y: "-200px" });

    tweenRef.current = gsap.to(beamRef.current, {
      y: "1200px",
      duration: beamOptions.duration || 8,
      ease: "none",
      repeat: -1,
      repeatDelay: beamOptions.repeatDelay || 0,
      delay: beamOptions.delay || 0,
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [beamKey, beamOptions.duration, beamOptions.repeatDelay, beamOptions.delay]);

  // Collision detection interval
  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // Check if the beam has reached the top of the bottom boundary line
        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  // Reset cycle after collision
  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      const timer1 = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      const timer2 = setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [collision]);

  return (
    <>
      <div
        ref={beamRef}
        style={{ left: beamOptions.initialX || "0px" }}
        className={`beams-laser-ray ${beamOptions.className || ""}`}
      />
      {collision.detected && collision.coordinates && (
        <Explosion
          key={`${collision.coordinates.x}-${collision.coordinates.y}`}
          style={{
            left: `${collision.coordinates.x}px`,
            top: `${collision.coordinates.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ style }) => {
  const flareRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP spark + flare animation — replaces motion.div / motion.span
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the central flare
      gsap.fromTo(
        flareRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out",
          onComplete: () => {
            gsap.to(flareRef.current, { opacity: 0, scale: 1.5, duration: 1.2, ease: "power1.out" });
          }
        }
      );

      // Animate each spark
      const sparks = containerRef.current?.querySelectorAll(".beams-explosion-spark");
      if (sparks) {
        sparks.forEach((spark) => {
          const dirX = parseFloat(spark.dataset.dirx || 0);
          const dirY = parseFloat(spark.dataset.diry || 0);
          const dur = parseFloat(spark.dataset.dur || 0.8);

          gsap.fromTo(
            spark,
            { x: 0, y: 0, opacity: 1 },
            { x: dirX, y: dirY, opacity: 0, duration: dur, ease: "power2.out" }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pre-generate spark data (stable across renders)
  const sparks = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        dirX: Math.floor(Math.random() * 80 - 40),
        dirY: Math.floor(Math.random() * -50 - 10),
        dur: Math.random() * 1.5 + 0.5,
      })),
    []
  );

  return (
    <div ref={containerRef} style={style} className="beams-explosion-container">
      <div ref={flareRef} className="beams-explosion-flare" />
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="beams-explosion-spark"
          data-dirx={spark.dirX}
          data-diry={spark.dirY}
          data-dur={spark.dur}
        />
      ))}
    </div>
  );
};
