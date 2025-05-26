import React, { useEffect, useState } from "react";

export default function NearbyCinemas() {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("الموقع غير مدعوم في هذا المتصفح");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=movie_theater&key=${apiKey}`;

        try {
          const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
          const data = await res.json();
          setCinemas(data.results);
        } catch (error) {
          console.error("Error fetching cinemas:", error);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        alert("فشل تحديد الموقع");
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p className="text-white">جاري تحميل السينمات...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-white mb-4">Cinema Near You</h2>
      <div className="flex flex-col gap-3">
        {cinemas.map((cinema) => (
          <div key={cinema.place_id} className="flex items-center justify-between bg-[#1E293B] rounded-xl p-3">
            <div>
              <p className="text-white text-sm">{cinema.name}</p>
              <p className="text-xs text-gray-400">
                📍 {cinema.vicinity}
              </p>
            </div>
            {cinema.rating && (
              <p className="text-yellow-400 font-semibold text-sm">
                ⭐ {cinema.rating}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
