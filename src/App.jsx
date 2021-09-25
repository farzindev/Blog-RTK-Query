import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./styles.scss";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// posts
import PostList from "./apps/posts/List";
import PostEdit from "./apps/posts/Edit";
import PostAdd from "./apps/posts/Add";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <Redirect to="/posts/" />
        </Route>
        <Route exact path="/posts/" component={PostList} />
        <Route exact path="/posts/add/" component={PostAdd} />
        <Route exact path="/posts/edit/:id" component={PostEdit} />
      </Router>
    </Provider>
  );
}

export default App;
