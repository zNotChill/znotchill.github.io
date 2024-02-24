
async function main() {
  const backgrounds = await fetch("https://api.znotchill.me/api/osu/seasonal-backgrounds");
  const bgJson = await backgrounds.json();

  const randomBackground = bgJson.backgrounds[Math.floor(Math.random() * bgJson.backgrounds.length)];
  const background = document.querySelector(".background");
  background.style.backgroundImage = `url(${randomBackground.url})`;

  const beans = await fetch("https://api.znotchill.me/api/osu/user/17119720");
  const json = await beans.json();

  const bg = document.querySelector(".profile-info__bg");
  const avatar = document.querySelector(".profile-info__details .avatar");
  const name = document.querySelector(".profile-info__info .profile-info__name");
  const flagImage = document.querySelector(".profile-info__info .profile-info__flags .profile-info__flag-flag .flag-country");
  const country = document.querySelector(".profile-info__info .profile-info__flags .profile-info__flag-text");
  
  bg.style.backgroundImage = `url(${json.cover_url})`;
  avatar.style.backgroundImage = `url(${json.avatar_url})`;
  name.textContent = json.username;
  flagImage.style.backgroundImage = `url(https://osu.ppy.sh/images/flags/${json.country.code}.png)`;
  country.textContent = json.country.name;

  const seasonalArtist = document.querySelector(".seasonal-background-artist");
  const seasonalCountry = seasonalArtist.querySelector(".artist-country .flag-country");
  const seasonalArtistName = seasonalArtist.querySelector(".artist-name");
  const artistDetails = document.querySelector(".artist-details");

  artistDetails.setAttribute("href", `https://osu.ppy.sh/users/${randomBackground.user.id}`);
  artistDetails.setAttribute("target", "_blank");

  seasonalArtistName.textContent = randomBackground.user.username;
  seasonalCountry.style.backgroundImage = `url(https://osu.ppy.sh/images/flags/${randomBackground.user.country_code}.png)`;

  // gradient mouse follow
  const baseGradSize = 50;
  const trailLength = 10;
  const trail = [];

  for (let i = 0; i < trailLength; i++) {
    let gradient = document.createElement('div');
    document.body.appendChild(gradient);
    gradient.style.transition = `left ${0.01 * i}s, top ${0.01 * i}s`;
    let gradSize = baseGradSize - i * 5; // Adjust size here
    gradient.style.background = `radial-gradient(circle, rgba(248,70,180,1) 0%, rgba(248,70,180,0) 100%)`;
    gradient.style.position = "fixed";
    gradient.style.width = `${gradSize}px`
    gradient.style.height = `${gradSize}px`
    gradient.style.borderRadius = "50%";
    gradient.style.pointerEvents = "none";
    trail.push({ gradient, gradSize });
  }

  document.addEventListener("mousemove", (e) => {
    trail.forEach(({ gradient, gradSize }, i) => {
      setTimeout(() => {
        gradient.style.left = `${e.clientX - (gradSize / 2)}px`
        gradient.style.top = `${e.clientY - (gradSize / 2)}px`
      }, 20 * i);
    });
  });
}

main();