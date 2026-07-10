const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://oqoegmdepqrcvlrygptj.supabase.co', 'sb_publishable_X_-BIr0Qxi-HC2zjf5bcfQ_AAindYBN');
async function test() {
  const { data, error } = await supabase.auth.signUp({ email: 'test@example.com', password: 'password123' });
  console.log("Signup:", { data, error });
  
  const { data: d2, error: e2 } = await supabase.from('pets').select('*');
  console.log("Pets:", { d2, e2 });
}
test();
