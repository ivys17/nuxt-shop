export default ({ redirect, route }) => {
  if (route.path === '/') {
    redirect('/1');
  }
}
