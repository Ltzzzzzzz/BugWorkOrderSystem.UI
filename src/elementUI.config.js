import Vue from "vue";
import { Button, Form, FormItem, Message } from "element-ui";

const components = [Button, Form, FormItem];

components.forEach(component => Vue.use(component));

Vue.prototype.$message = Message;
