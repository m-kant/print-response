import app from '../fapp';
import UsersRepo from "./users.repo";


app.get('/sample/hello', async (req, res) => {
  req.log.info('some logggg')
  return 'Hello Universe!';
})

app.get('/sample/users', async (req, res) => {
  const { search } = req.query as { search: string };
  return UsersRepo.findAll(search);
})

// app.post('/sample/users', async (req, res) => {
//   const user = req.body as User;
//   return UsersRepo.insert(user);
// })

app.get('/sample/users/:user_id', async (req, res) => {
  const { user_id } = req.params as {user_id: number};
  return UsersRepo.findOne(user_id);
})
