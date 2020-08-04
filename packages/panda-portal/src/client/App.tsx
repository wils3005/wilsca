// import { Col, Container, Row } from "react-bootstrap";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
// import MyNavbar from "./navbar";
import React from "react";

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
// export default function App(): JSX.Element {
//   return (
//     <Container>
//       <MyNavbar />
//       <Row>
//         <Col>
//           <p>
//             The smartest way to <br />
//             train your team and <br />
//             partner agents
//           </p>
//           <p>
//             Panda provides agents with
//             <span>one powerful platform</span> to access all the sales
//             trainings, marketing materials, admissions procedures and policies
//             of
//             <span>all the participating schools they represent.</span>
//           </p>
//           <form
//             action="https://pandaportal.co/index.php/register"
//             method="post"
//           >
//             <input
//               type="hidden"
//               name="_token"
//               value="xtI4s0Xq2I2ZqP2ESa35yxs3jQX7eNCbpUO40kLx"
//             />
//             <div>
//               <input
//                 type="email"
//                 placeholder="Write your E-mail"
//                 name="email"
//                 id="email"
//                 required
//               />
//             </div>
//             <div>
//               <button type="submit">GET STARTED FOR FREE</button>
//             </div>
//           </form>
//         </Col>
//         <Col>
//           <img
//             src="https://pandaportal.co/assets/images/frontend/web.png"
//             alt=""
//           />

//           <iframe
//             src="https://player.vimeo.com/video/427895932?color=EED429&amp;byline=0&amp;portrait=0"
//             width="640"
//             height="360"
//             frameBorder="0"
//             allow="autoplay; fullscreen"
//             id="panda-iframe-video-home"
//             title="vimeo"
//           ></iframe>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
