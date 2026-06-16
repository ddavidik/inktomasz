import site from "@content/site.json";

export const BookingInfo = () => {
  const bookingLabel = site.inquiry.bookingLabel.replace("{weeks}", String(site.booking.weeksOut));

  return (
    <>
      <p className="mono mt-4 text-[11px] text-(--blood-bright)">
        {site.inquiry.bookingRune ?? "\u16cf"} &nbsp; {bookingLabel}
      </p>
      <p className="mono mt-2 text-[11px] text-(--bone-fade)">{site.inquiry.bookingSubtext}</p>
    </>
  );
};
