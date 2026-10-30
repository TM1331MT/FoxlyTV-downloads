const callback = location.href, params = new URL(callback).searchParams;
// Remove the short-lived code from browser history before loading anything else.
history.replaceState(null, '', location.pathname);
const message = document.getElementById('message');
if (params.has('error')) message.textContent = 'Je hebt de aanmelding geweigerd. Start opnieuw in FoxlyTV.';
else if (!params.get('code') || !params.get('state')) message.textContent = 'Start je Trakt-aanmelding vanuit FoxlyTV.';
else {
  message.textContent = 'Je toestemming is ontvangen. Rond de koppeling af in FoxlyTV.';
  document.getElementById('callback').hidden = false;
  const field = document.getElementById('return-url'); field.value = callback;
  document.getElementById('copy').onclick = async () => {
    try { await navigator.clipboard.writeText(callback); message.textContent = 'Gekopieerd. Plak de link nu in FoxlyTV.'; }
    catch { field.focus(); field.select(); message.textContent = 'Kopieer de geselecteerde link met Ctrl+C of ⌘C.'; }
  };
}
