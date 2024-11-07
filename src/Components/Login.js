import React from 'react';
import 'tachyons';

const Login = ({ handleSignIn }) => {


    return (
      <div className='flex justify-center items-center vh-100'>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main class="pa4 black-80">
  <form className="measure center">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend className="f4 fw6 ph0 mh0 tc">Find Wisdom</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6 tc" for="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6 tc" for="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="tc">
      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={handleSignIn} type="submit" value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      {/* <a href="#0" class="f6 link dim black db">Sign up</a> */}
    </div>
  </form>
</main>
</article>
</div>
        
    )

}

export default Login;

        
   






 {/* <form onSubmit={handleSubmit}>
    <input
    type="text"
    placeholder="username"
    value={username}
    onChange={(event) => setUsername(event.target.value)}
    />
    <input
    type="password"
    placeholder="password"
    value={password}
    onChange={(event) => setPassword(event.target.value)}
    />
    <button type="submit">Sign in</button>
    </form> */}

{/* const handleSubmit = (event) => {
        event.preventdefault ();
        onLogin(username, password);

    } */}