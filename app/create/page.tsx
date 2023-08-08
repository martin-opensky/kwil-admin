'use client';

import useDatabase from '@/hooks/use-databases';
import useSchema from '@/hooks/use-schema';
import useKwilProvider from '@/hooks/use-kwil-provider';
import Editor from '@monaco-editor/react';

export default function Page() {
  useKwilProvider();
  const { databases } = useDatabase();
  const { schema } = useSchema();

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h1>Create</h1>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          path="app/create/page.tsx"
        />
        <h1>Save</h1>
      </div>
    </div>
  );
}
