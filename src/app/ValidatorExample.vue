<template>
  <div>
    <validator name="validation">
      <form novalidate>
        <div class="username-field">
          <label for="username">username:</label>
          <input id="username" type="text" v-validate:username="['required']">
        </div>
        <div class="comment-field">
          <label for="comment">comment:</label>
          <input id="comment" type="text" v-validate:comment="{ maxlength: 256 }">
        </div>
        <div class="errors">
          <p v-if="$validation.username.required">Required your name.</p>
          <p v-if="$validation.comment.maxlength">Your comment is too long.</p>
        </div>
        <input type="submit" value="send" v-if="$validation.valid">
      </form>
      <pre><code>{{$validation|json}}</code></pre>
    </validator>
  </div>
</template>
