const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://oqoegmdepqrcvlrygptj.supabase.co', 'sb_publishable_X_-BIr0Qxi-HC2zjf5bcfQ_AAindYBN');
async function test() {
  const { data: signin, error: e1 } = await supabase.auth.signInWithPassword({ email: 'test@example.com', password: 'password123' });
  if (e1) {
    console.error("Login Error:", e1);
    return;
  }
  
  const user = signin.user;
  
  const newPet = {
    nome: "Rex",
    especie: "Cachorro",
    raca: "Vira-lata",
    user_id: user.id
  };

  console.log("Inserting:", newPet);
  const { data: d2, error: e2 } = await supabase.from('pets').insert(newPet).select();
  console.log("Create Pet:", { d2, e2 });
}
test();
