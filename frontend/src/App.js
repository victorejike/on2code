import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState('');
  const [loginResult, setLoginResult] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Cannot reach backend'));

    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch(() => setCourses([]));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setError('');
    setLoadingLogin(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setLoginResult(data);
    } catch (err) {
      setError('Unable to sign in at the moment.');
      setLoginResult(null);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="app-shell">
      <header>
        <div className="header-grid">
          <div className="hero-copy">
            <p className="eyebrow">Future-ready learning</p>
            <h1>Build real skills with a modern coding platform.</h1>
            <p>{message}</p>
          </div>

          <aside className="card login-card">
            <h2>Quick sign in</h2>
            <form onSubmit={handleLogin} className="login-form">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
              <button type="submit" disabled={loadingLogin}>
                {loadingLogin ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            {loginResult && (
              <p className="login-success">
                Welcome back, <strong>{loginResult.email}</strong>!
              </p>
            )}
            {error && <p className="error-text">{error}</p>}
          </aside>
        </div>
      </header>

      <section className="card intro-card">
        <div className="intro-grid">
          <div>
            <h2>Learn with hands-on courses, projects, and mentorship.</h2>
            <p>
              Access curated content, discover technical pathways, and track your
              progress from day one.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>24+</strong>
              <span>Courses</span>
            </div>
            <div className="stat-card">
              <strong>500+</strong>
              <span>Students</span>
            </div>
            <div className="stat-card">
              <strong>99%</strong>
              <span>Positive feedback</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Featured Courses</h2>
        <div className="grid">
          {courses.map((course) => (
            <article key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.slug}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Backend on port 4000, frontend on port 3000.</p>
      </footer>
    </div>
  );
}

export default App;
