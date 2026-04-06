import { updateProfileImageAction } from './src/actions/user-actions.js';
import { readFileSync } from 'fs';

async function run() {
  try {
    const fileBuffer = readFileSync('/Users/noian/Desktop/test커머스/03d8078752dcdec9497def571839764d.jpg');
    const file = new File([fileBuffer], '03d8078752dcdec9497def571839764d.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file);
    // User ID from earlier error trace
    formData.append('userId', 'cmnh33jfs0000a8vf15ti7yjj');

    const result = await updateProfileImageAction(formData);
    console.log("Action Result:", result);
  } catch (error) {
    console.error("Crash Error:", error);
  }
}
run();
