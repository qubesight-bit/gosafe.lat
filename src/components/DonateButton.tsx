export function DonateButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="6KSYYL7XT7K9Y" />
        <input
          type="image"
          src="https://pics.paypal.com/00/s/NDc0Y2ZlOTEtMTBiMi00NWM5LTllNWMtZjU0NjNiZjU1YjJh/file.PNG"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
          className="cursor-pointer"
        />
        <img alt="" src="https://www.paypal.com/en_CR/i/scr/pixel.gif" width="1" height="1" />
      </form>
    </div>
  );
}
