import "./Profile.css"

function Profile() {
  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <h1>Jan Aaron Einloo</h1>
          <br />
          <ul>
            <li>Muusika</li>
            <li>Sport</li>
            <li>Mängimine</li>
            <li>Loodus (huvitavates kohtades ujumine)</li>
          </ul>
          <br />
          <form>
            <p>Minu e-mail: einloojanaaron@gmail.com</p>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Sinu email"
            />
            <br />
            <label>Sõnum:</label>
            <br />
            <textarea placeholder="Sinu sõnum"></textarea>
            <br />
            <button type="submit">Saada</button>
          </form>
          <br />
          <button className="button button1">Helista</button>
        </div>
      </div>
    </>
  )
}

export default Profile
