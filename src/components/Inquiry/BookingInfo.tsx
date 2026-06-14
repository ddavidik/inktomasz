import site from "@content/site.json";

export const BookingInfo = () => (
  <>
    <p className="mono mt-4 text-[11px] text-(--blood-bright)">
      ᛏ &nbsp; Currently booking ~{site.booking.weeksOut} weeks out
    </p>
    <p className="mono mt-2 text-[11px] text-(--bone-fade)">
      Fast needle — a full back piece in a single session is not unusual.
    </p>
  </>
);
