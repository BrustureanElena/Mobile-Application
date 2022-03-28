module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '59dcd010de927140bf3380f8ff746ba3'),
  },
});
