

# Eqs Slide

## Usage EqEditor 

```javascript
{#if slide}
<EqEditor  
bind:items={slide.items}  
{currentTime}
bind:slideExtra={slide.slideExtra}
/>
{/if}
```

## Usage EqPlayer

```javascript
{#if slide}
        <EqPlayer  
                items={ slide.items}  
                {currentTime}
                {setPulse}
        />
{/if}
```

