import { Box, FormLabel, Typography, Button, TextField } from '@mui/material';
import Joi from 'joi';
import React from 'react';
import { useParams } from 'react-router-dom'

import { FormInputField, RenderProps } from 'components/FormInputField';
import { useForm, ValidatedResult } from 'hooks/useForm';
import useRequest from 'hooks/useRequest';

const schema = Joi.object({
  id: Joi.string().max(50).trim().required().label('拠点の選択'),
  name: Joi.string().max(50).trim().required().label('ユーザー名'),
  email: Joi.string().max(50).trim().email().required().label('メールアドレス'),
  description: Joi.string().max(200).trim().allow('').label('説明'),
});

type Form = {
  id: string;
  name: string;
  email: string;
  description: string;
};

function UserEdit({ className }: { className?: string }) {
  const form = useForm<Form>({ schema });
  const { request } = useRequest();
  const { id } = useParams();
  const [user, setUser] = React.useState<any>({});
  const roleOptions = ['管理者', '閲覧者'];

  async function fetchData() {
    const res: any = await request(`api/user/${id}`);
    setUser(res);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    form.setInitialValues({
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
    });
  }, [user]);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!form.isValid) {
        form.setOptions({
          returnErrorsAlways: true,
        });
        return;
      }

      const { values }: ValidatedResult<Form> = form.validate();
      // APIコール
      // ここでToastを呼ぶ
      console.log(values);
    },
    [form],
  );

  return (
    <Box className={className} mx={3}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
        ユーザー編集
      </Typography>
      <Box sx={{ mt: 5, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 6, width: '60%', minWidth: 300, display: 'flex' }}>
            <FormLabel sx={{ width: '40%' }}>ID</FormLabel>
            <FormInputField
              form={form}
              name="id"
              type="text"
              render={(props: RenderProps<Form>) => (
                <TextField
                  {...props}
                  disabled={true}
                  type="text"
                  error={!!form.errors?.id}
                  helperText={form.errors?.id?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: 6, width: '60%', minWidth: 300, display: 'flex' }}>
            <FormLabel sx={{ width: '40%' }}>ユーザー名</FormLabel>
            <FormInputField
              form={form}
              name="name"
              type="text"
              render={(props: RenderProps<Form>) => (
                <TextField
                  {...props}
                  type="text"
                  error={!!form.errors?.name}
                  helperText={form.errors?.name?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: 6, width: '100%', display: 'flex' }}>
            <Box sx={{ flexBasis: '60%', minWidth: 300, display: 'flex' }}>
              <FormLabel sx={{ width: '40%' }}>メールアドレス</FormLabel>
              <FormInputField
                form={form}
                name="email"
                type="text"
                render={(props: RenderProps<Form>) => (
                  <TextField
                    {...props}
                    type="text"
                    error={!!form.errors?.email}
                    helperText={form.errors?.email?.message}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 6, width: '100%', display: 'flex' }}>
            <Box sx={{ flexBasis: '60%', minWidth: 300, display: 'flex' }}>
              <FormLabel sx={{ width: '40%' }}>説明</FormLabel>
              <FormInputField
                form={form}
                name="description"
                type="text"
                render={(props: RenderProps<Form>) => (
                  <TextField
                    {...props}
                    multiline
                    rows={5}
                    type="text"
                    error={!!form.errors?.description}
                    helperText={form.errors?.description?.message}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button type="submit">保存</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default UserEdit;
